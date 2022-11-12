/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr
 */

if (typeof diss == "undefined") window.diss = new Object();

// utils
diss.utils = {
    log: message => console.log(`%c[DISSENSION] %c${message}`, `color:crimson;font-weight:bold`, ""),
    Webpack() {
        if (this.cachedWebpack) return this.cachedWebpack;

        let webpackExports;

        if (window.webpackChunkdiscord_app != null) {
            const Ids = ['__extra_Id__'];
            window.webpackChunkdiscord_app.push([
                Ids,
                {},
                (req) => {
                    webpackExports = req;
                    Ids.length = 0;
                }
            ]);
        }
        else return null;

        const cachedExports = new Set(),
            moduleCache = new Set(),

            addModuleToCache = (module) => {
                if (typeof module !== 'object' && typeof module !== 'function') return;

                if (module.__esModule && module.default)
                    module = module.default;

                moduleCache.add(module);
            },
            addModulesToCache = (modules) => {
                for (const rawModule of modules) {
                    const exports = rawModule.exports;
                    if (!cachedExports.has(exports)) {
                        cachedExports.add(exports);

                        if (typeof exports === 'object') {
                            const properties = Object.values(Object.getOwnPropertyDescriptors(exports));
                            const getters = properties.filter(x => x.get);
                            if (getters.length !== 0 && getters.length === properties.length) {
                                try {
                                    // These getters should work without the this parameter
                                    getters.map(({ get }) => get()).forEach(addModuleToCache);
                                }
                                catch {
                                    addModuleToCache(exports);
                                }
                                continue;
                            }
                        }

                        addModuleToCache(exports);
                    }
                }
            },
            findModule = (filter) => {
                const cache = Object.values(webpackExports.c);
                if (cache.length !== cachedExports.size)
                    addModulesToCache(cache);

                for (const module of moduleCache.values()) {
                    if (filter(module)) return module;
                };

                return null;
            },
            findModuleByUniqueProperties = (propNames) => findModule(module => propNames.every(prop => module[prop] !== undefined));

        return this.cachedWebpack = { findModule, findModuleByUniqueProperties };
    },
    patch(obj, key, interceptor) {
        const ori = obj[key],
            patch = async function () {
                const res = await interceptor(...arguments);
                (res === null)
                    ? null
                    : ori(...res);
            };

        obj[key] = patch;
    },
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    },
    imsg(content, embeds = []) {
        diss.modules.showMessage({ author: { username: "DISS" }, content, embeds });
    }
};
diss.utils.log("Defined utilities (diss.utils)");

// discord modules bootstrap
diss.utils.Webpack();
diss.discordModules = new Object();
(function (dm, fup, fm) {

    // misc
    dm.MessageQueue = fup(['enqueue', 'handleSend', 'handleEdit']);
    dm.MessageDispatcher = fup(['dispatch', 'wait']);
    dm.UserCache = fup(['getUser', 'getUsers', 'getCurrentUser']);
    dm.ChannelCache = fup(['getChannel', 'getDMFromUserId']);
    dm.SelectedChannelStore = fup(['getChannelId', 'getVoiceChannelId', 'getLastSelectedChannelId']);
    dm.GuildCache = fup(['getGuild', 'getGuilds']);


    dm.PermissionEvaluator = fup(['can', 'computePermissions', 'canEveryone']);
    dm.RelationshipStore = fup(['isFriend', 'isBlocked', 'getFriendIds']);
    dm.PrivateChannelManager = fup(['openPrivateChannel', 'ensurePrivateChannel', 'closePrivateChannel']);
    dm.Premium = fup(['canUseEmojisEverywhere']);

    // files
    dm.FileUploader = fup(['upload', 'cancel', 'instantBatchUpload']);
    dm.CloudUploadPrototype = fm(x => x.prototype?.uploadFileToCloud && x.prototype.upload)?.prototype;
    dm.CloudUploadHelper = fup(['getUploadPayload']);

    // drafts
    dm.DraftStore = fup(["getDraft"]);
    dm.DraftActions = fup(["changeDraft", "saveDraft"]);

    // system
    dm.MessageActions = fup(["receiveMessage", "sendBotMessage"])

})(diss.discordModules, diss.utils.cachedWebpack.findModuleByUniqueProperties, diss.utils.cachedWebpack.findModule);
diss.utils.log("Bootstrapped discord modules (diss.discordmodules)");

// DISSENSION modules
diss.modules = new Object();
(function (m) {
    m.current = { // getters for properties related to the current user location
        get guildId() {
            return document.location.pathname.split('/')[2];
        },
        get channelId() {
            return document.location.pathname.split('/').pop();
        }
    }

    m.gen = {
        _id: 0,
        get id() {
            const cid = this._id + 0;
            this._id += 1;
            return cid;
        }
    };

    m.sendFile = file => diss.discordModules.FileUploader.upload({
        channelId: m.current.channelId,
        file,
        hasSpoiler: false,
        fileName: file.name,
        draftType: 1,
        message: { content: '' }
    });

    m.clyde = msg => diss.discordModules.MessageActions.sendBotMessage(m.current.channelId, msg);

    m.showMessage = obj => diss.discordModules.MessageActions.receiveMessage(m.current.channelId, diss.utils.mergeDeep({ id: m.gen.id, type: 0, flags: 64, content: ".", channel_id: m.current.channelId, author: { id: 0, discriminator: "4", username: "User" }, embeds: [], mentions: [], timestamp: "2014-12-31T01:01:01", mentioned: !0 }, obj));

    m.cmd = {
        // helpers
        setInputStyle(style) {
            const area = document.querySelector("[class*=scrollableContainer-]"),
                styles = [
                    "cmdmode",
                    "cmdinput"
                ];
            for (const cssclass of styles) area.classList.remove(cssclass);
            if (!styles.includes(style)) return;
            area.classList.add(style);
        },
        getInput(dialog){
            if(!diss.utils._cmdmode) throw new TypeError("[DISS] Not in command mode!");
            if(m.cmd.getInput._callback) throw new TypeError("[DISS] An input is already active; cannot have more than one input request at a time!");
            return new Promise(res => {
                m.cmd.setInputStyle("cmdinput");
                document.querySelector("[class*=placeholder-]").setAttribute("diss-dialog", dialog);
                m.cmd.getInput._callback = function(msg){
                    delete m.cmd.getInput._callback;
                    m.cmd.setInputStyle("cmdmode");
                    res(msg);
                };
            });
        },

        // registry and execution
        _r: {},
        add(name, dat, defaultHandler) {
            this._r[name] = { default: defaultHandler, dat };
        },
        addSub(parentName, name, dat, handler) {
            this._r[parentName][name] = { dat, handler };
        },
        exec(cmstr) {
            
        }
    }

})(diss.modules);
diss.utils.log("Added custom modules (diss.modules)");

// DISSENSION command mode handlers
diss.utils._cmdmode = false;
(function (cmd) {
    // actions

    // registering default commands
    // cmd.add()

    // patch sendMessage
    diss.utils.patch(diss.discordModules.MessageActions, "sendMessage", (...args) => {
        const [messageId, message, x1, x2] = args;
        console.log(message)

        // toggle cmdmode
        if (message.content == "$cmd") {
            diss.utils._cmdmode ^= 1;
            cmd.setInputStyle(diss.utils._cmdmode ? "cmdmode" : "default");
            diss.utils.log(`command mode set to: ${!!diss.utils._cmdmode}`);
        };

        // getting input
        const cb = diss.modules.cmd.getInput._callback
        if(cb) cb(message.content);

        // block if cmdmode, passthrough if not
        return (!diss.utils._cmdmode && message.content != "$cmd")
            ? args
            : ( // unreadable black magic
                (message.content == "$cmd")
                    ? 0
                    : cmd.exec(message.content),
                null
            );
    });
})(diss.modules.cmd);
diss.utils.log("Set up command mode (send $cmd to toggle)");

// DISS styles
(function () {
    document.head.insertAdjacentHTML('beforeend', `
<style>
    /* cmdmode */
    .cmdmode {
        border: 2px solid var(--info-warning-foreground);
        background-color: var(--background-mentioned);
    } 
    .cmdmode [class*=placeholder-]::after{
        content: "Enter command";
        visibility: visible;
        font-size: initial;
    }

    /* cmdmode's dynamic input */
    .cmdinput {
        border: 2px solid #25f4bf;
        background-color: #3d4946;
    } 
    .cmdinput [class*=placeholder-]::after{
        content: attr(diss-dialog);
        visibility: visible;
        font-size: initial;
    }

    /* for all */
    :is(.cmdmode, .cmdinput) [class*=placeholder-]{
        visibility: hidden;
        font-size: 0;
        
    } 
    :is(.cmdmode, .cmdinput) [class*=buttons-]>:nth-child(-n+3) {
        display: none;
    }
</style>
    `);
})();
diss.utils.log("Applied custom styles");