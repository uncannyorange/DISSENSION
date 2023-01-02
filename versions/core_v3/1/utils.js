diss.utils = {
    log: message => console.log(`%c[DISSENSION] %c${message}`, `color:crimson;font-weight:bold`, ""),
    sleep: async ms => new Promise(res => setTimeout(res, ms)),
    cacheWebpack() {
        if (diss.Webpack) return diss.Webpack;
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

        const findModule = (filter) => {
            for (let i in webpackExports.c) {
                if (webpackExports.c.hasOwnProperty(i)) {
                    let m = webpackExports.c[i].exports;
                    if (!m) continue;
                    if (m.__esModule && m.default) m = m.default;
                    if (filter(m)) return m;
                }
            }

            return null;
        };
        const findModuleByProps = propNames => findModule(module => propNames.every(prop => module[prop] !== undefined));

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
    get channelId(){
        return this.discordModules.SelectedChannelStore.getChannelId();
    },
    get guildId(){
        return document.location.pathname.split('/')[2];
    },

    // notifs
    imsg(content, embeds = []) {
        diss.modules.showMessage(this.channelId, { author: { username: "DISS" }, content, embeds });
    }
};
diss.utils.log("Defined utilities (diss.utils)");