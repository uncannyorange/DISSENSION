// strapping things together
(function () {
    diss.utils.patch(diss.discordModules.MessageActions, "sendMessage", (...args) => {
        const [messageId, message, x1, x2] = args;

        let trace;
        for (const sih of diss.plugins._sendInterceptHandlers) {
            trace = sih.handler(message);
            if (trace === null) return null;
        };

        return [messageId, trace, x1, x2];
    });
})();

// plugins module
diss.plugins = {
    //
    // direct plugin actions
    //
    _registry: {},
    /**
     * Adds a plugin to the plugin registry.
     * @param {Object} data An object with properties `{name, displayName, description, version, repoURL}`
     * @param {Object} pluginobj An object with the `enable` and `disable` methods, as well as any other property the plugin needs.
     */
    registerPlugin({ name, displayName, description, version, repoURL }, pluginobj) {
        this._registry[name] = { displayName, description, version, repoURL, plugin: pluginobj };
        diss.m.storage.store("pluginRegistryCache", this._registry);
    },
    removePlugin(name){

    },
    /**
     * Runs a registered plugin's `enable` function.
     * @param {String} name the name of the plugin to enable.
     */
    enable(name) {
        return this._registry[name].plugin.enable(diss.plugins);
    },
    /**
     * Runs a registered plugin's `disable` function and purges its handlers.
     * @param {String} name the name of the plugin to disable.
     */
    disable(name) {
        this._registry[name].plugin.disable(diss.plugins);
        this._purgeHandlers(name);
    },

    //
    // handlers
    //
    _sendInterceptHandlers: [],
    registerSendIntercept({ name, from }, handler) {
        this._sendInterceptHandlers.push({ name, from, handler });
    },

    _commands: [],
    registerCommand({ name, description, man, from }, handler) {
        this._commands.push({ name, from, description, man, handler });
    },


    _purgeHandlers(pluginname) {
        for (const registry of [this._sendInterceptHandlers, this._commands])
            for (const handler of registry.filter(h => h.from == pluginname)) {
                const index = registry.indexOf(handler);
                if (index > -1) registry.splice(index, 1);
            };
    },

    //
    // Command
    //
    _cli: {
        handle({ args }) {
            const [_0, _1, ...rest] = args;
            switch (args[1]) {
                case "list":
                    this.listPlugins();
                    break;

                case "enable":
                    this.enablePlugins(rest);
                    break;

                case "disable":
                    this.disablePlugins(rest);
                    break;

                case "add":
                    this.addPlugin(rest);
                    break;

                case "remove":
                    this.removePlugin(rest);
                    break;

                default:
                    break;
            }
        },
        listPlugins(){

        },
        enablePlugins(plugins){
            plugins.forEach(plugin => {
                if (!diss.p._registry[plugin]) return diss.utils.imsg(`\`[plugin] plugin "${plugin}" not found.\``);
                diss.p.enable(plugin);
            });
        },
        disablePlugins(plugins){
            plugins.forEach(plugin => {
                if (!diss.p._registry[plugin]) return diss.utils.imsg(`\`[plugin] plugin "${plugin}" not found.\``);
                diss.p.disable(plugin);
            });
        }, 
        addPlugin(plugins){

        },
        removePlugin(plugins){

        }
    }
};

// core plugins
(function () {
    // defult manpage
    const man = "https://github.com/uncannyorange/DISSENSION/blob/main/versions/core_v3/README.md"

    // load data
    //diss.modules.store.load("pluginRegistryCache");

    // command mode
    diss.plugins.registerPlugin({ name: "cmd", displayName: "Command Mode", description: "Coreutil that allows other plugins to register commands." },
        {
            enable() {
                diss.utils.log("[CMD] Enabled cmd module");
                diss.plugins.registerSendIntercept({ name: "cmd", from: "cmd" }, diss.modules.cmd.handle.bind(diss.modules.cmd));
                diss.plugins.registerCommand({ name: "help", description: "Shows info about a command", from: "cmd", man }, function cmdhelp({ args }) {
                    if (args[1] == "all") {
                        return diss.plugins._commands.forEach(c => cmdhelp({ args: [0, c.name] }));
                    };

                    const command = diss.plugins._commands.find(cmd => cmd.name == args[1]);
                    if (!command) return diss.utils.imsg(`\`[help] command "${args[1]}" not found.\``);
                    diss.utils.imsg("", [{
                        "type": "rich",
                        "title": `Command help`,
                        "description": `Help for \`${command.name}\``,
                        "color": 0xff5100,
                        "fields": [
                            {
                                "name": `Description:`,
                                "value": `${command.description}`
                            }
                        ],
                        "footer": {
                            "text": `manpage at: ${command.man}`,
                        }
                    }]);
                });
            },
            disable() { }
        });

    // plugin manager
    diss.plugins.registerPlugin({ name: "plugins", displayName: "Plugins", description: "Coreutil command to manage plugins" },
        {
            enable(p) {
                diss.utils.log("[PLUGIN] Enabled plugins command");
                p.registerCommand({ name: "plugin", description: "Add, remove, enable, and disable plugins.", from: "plugins", man }, diss.plugins._cli.handle.bind(diss.plugins._cli));
            },
            disable() { }
        });

    // themes/custom css
    diss.plugins.registerPlugin({ name: "css", displayName: "Themes", description: "Coreutil that adds theming and custom css support." },
        {
            enable() {
                diss.utils.log("[CSS] Enabled css module");
                diss.plugins.registerCommand({ name: "css", description: "Manage themes and custom css", from: "css", man });
            },
            disable() { }
        });
})();
diss.utils.log("Set up plugins (diss.plugins)");
