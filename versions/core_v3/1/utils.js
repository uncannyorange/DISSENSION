diss.utils = {
    log: message => console.log(`%c[DISSENSION] %c${message}`, `color:crimson;font-weight:bold`, ""),
    sleep: async ms => new Promise(res => setTimeout(res, ms)),
    cacheWebpack() {
        if (this.Webpack) return this.Webpack;
        let webpackExports;
        if (window.webpackChunkdiscord_app != null) {
            const Ids = ['__extra_Id__'];
            window.webpackChunkdiscord_app.push([
                Ids, {}, (req) => {
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
                if (module.__esModule && module.default) module = module.default;
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
            findModuleByProps = (propNames) => findModule(module => propNames.every(prop => module[prop] !== undefined));

        return diss.Webpack = { findModule, findModuleByProps };
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

    // current IDs
    get channelId() {
        return diss.discordModules.SelectedChannelStore.getChannelId();
    },
    get guildId() {
        return document.location.pathname.split('/')[2];
    },

    // notifs
    imsg(content, embeds = []) {
        diss.modules.showMessage(this.channelId, { author: { username: "DISS" }, content, embeds });
    }
};
diss.utils.log("Defined utilities (diss.utils)");