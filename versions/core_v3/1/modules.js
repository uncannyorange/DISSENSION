diss.modules = {
    getNonce: (window.BigInt != null) ? () => (BigInt(Date.now() - 14200704e5) << BigInt(22)).toString() : () => Date.now().toString(),

    // info & message related things
    clyde: msg => diss.dm.MessageActions.sendBotMessage(m.current.channelId, msg),
    showMessage: (chanid, msgobj) => diss.dm.MessageActions.receiveMessage(chanid, diss.utils.mergeDeep({ id: diss.m.getNonce(), type: 0, flags: 64, content: ".", channel_id: diss.u.channelId, author: { id: 0, discriminator: "4", username: "User" }, embeds: [], mentions: [], timestamp: "2014-12-31T01:01:01", mentioned: !0 }, msgobj)),

    // themes
    css: {
        enable(id, css) {
            document.head.insertAdjacentHTML('beforeend', `<style diss-style-id=${id}>${css}</style>`);
        },
        disable(id) {
            document.head.remove(document.querySelector(`style[diss-style-id=${id}]`));
        },
        async compile(css) {
            return this.minify(await this.bundle(css));
        },
        minify(css) {
            return css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
                .replace(/ {2,}/g, ' ')
                .replace(/ ([{:}]) /g, '$1')
                .replace(/([;,]) /g, '$1')
                .replace(/ !/g, '!');
        },
        async bundle(css) {
            const imports = this._getImports(this._stripComments(css));
            for (const imp of imports) {
                css = css.replace(
                    imp.import,
                    await this.bundle(await dfetch(imp.url).then(res => res.text()))
                );
            }
            return css;
        },
        _stripComments: css => css.replaceAll(/\/\*[\s\S]*?\*\//g, ""),
        _getImports(css) {
            const reg = {
                import: /(?:@import)(?:\s)(?:url)?(?:(?:(?:\()(["\'])?(?:[^"\')]+)\1(?:\))|(["\'])(?:.+)\2)(?:[A-Z\s])*)+(?:;)/gi,
                url: /(?<=url\().+(?=\);)/gi,
                endquotes: /(^["']|["']$)/g
            };
            const imports = [];
            css.match(reg.import)?.forEach(imp => imports.push({ import: imp, url: imp.match(reg.url)[0].replace(reg.endquotes, '') }));
            return imports;
        },

    },

    // command
    cmd: {
        // helpers
        inputStyle(act, style) {
            document.querySelector("[role=textbox]").blur();
            const area = document.querySelector("[class*=scrollableContainer-]"),
                styles = ["cmdmode", "cmdinput"];
            if (!styles.includes(style) || !["add", "remove"].includes(act)) return;
            area.classList[act](style);
        },
        getInput(dialog) {
            if (this.getInput._callback) throw new TypeError("[DISS] An input is already active; cannot have more than one input request at a time!");
            return new Promise(async res => {
                this.inputStyle("add", "cmdinput");
                document.querySelector("[class*=placeholder-]").setAttribute("diss-dialog", dialog);
                this.getInput._callback = function (msg) {
                    delete this.getInput._callback;
                    this.inputStyle("remove", "cmdinput");
                    res(msg);
                };
            });
        },

        // handling
        _cmdmode: 0,
        handle(message) {
            if (message.content == "$cmd") this._cmdmode ^= 1; 
            if (this._cmdmode) {
                this.inputStyle('add', 'cmdmode');
                this.exec(message.content);
                return null;
            } else {
                this.inputStyle('remove', 'cmdmode');
                return message;
            }
        },
        exec(command) {
            const args = this.parse(command);
            diss.plugins._commands.find(cmd => cmd.name == args[0]).handler({ args });
        },
        parse(command) {
            const args = command.match(/("[^"]+"|[^\s"]+)/g);

            // potential future flags support?
            //     rawflags = args.filter(arg => !!arg.match(/ /g)),
            //     flags = [];

            // rawflags.forEach(flag => {
            //     const fobj = {},
            //         nextarg = args[args.indexOf(flag.split("--")[1]) + 1];
            //     fobj[flag.split("--")[1]] = (!nextarg.match(/^--/)) ? nextarg : true;
            // });

            return args;
        }
    }
}