// strapping things together
(function () {
    diss.utils.patch(diss.discordModules.MessageActions, "sendMessage", (...args) => {
        const [messageId, message, x1, x2] = args;

        let trace;
        for(const sih of diss.plugins._sendInterceptHandlers){
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
    cli: {

    }
};

// core plugins
(function () {
    // command mode
    diss.plugins.registerPlugin({ name: "cmd", displayName: "Command Mode", description: "Coreutil that allows other plugins to register commands." },
        {
            enable() {
                diss.plugins.registerSendIntercept({ name: "cmd", from: "cmd" }, diss.modules.cmd.handle.bind(diss.modules.cmd));
                diss.plugins.registerCommand({ name: "help", description: "Shows info about a command", from: "cmd" }, function ({ args }) {
                    const command = diss.plugins._commands.find(cmd => cmd.name == args[1]);
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

    // themes/custom css
    diss.plugins.registerPlugin({ name: "css", displayName: "Themes", description: "Coreutil that adds theming and custom css support." },
        {
            enable() {
                diss.plugins.registerCommand({ name: "css", description: "Manage themes and custom css", from: "css" });
            },
            disable() { }
        });

    // plugin manager
    diss.plugins.registerPlugin({ name: "plugins", displayName: "Plugins", description: "Coreutil command to manage plugins" },
        {
            enable({ registerCommand }) {

            },
            disable() { }
        });
})();