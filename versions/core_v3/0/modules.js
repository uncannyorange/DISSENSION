diss.modules = new Object();
(function (m, dm) {
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

    m.sendFile = file => dm.FileUploader.upload({
        channelId: m.current.channelId,
        file,
        hasSpoiler: false,
        fileName: file.name,
        draftType: 1,
        message: { content: '' }
    });

    m.clyde = msg => dm.MessageActions.sendBotMessage(m.current.channelId, msg);

    m.showMessage = obj => dm.MessageActions.receiveMessage(m.current.channelId, diss.utils.mergeDeep({ id: m.gen.id, type: 0, flags: 64, content: ".", channel_id: m.current.channelId, author: { id: 0, discriminator: "4", username: "User" }, embeds: [], mentions: [], timestamp: "2014-12-31T01:01:01", mentioned: !0 }, obj));

    m.getNonce = (window.BigInt != null) ? () => (BigInt(Date.now() - 14200704e5) << BigInt(22)).toString() : () => Date.now().toString()

    m.cmd = {
        // helpers
        setInputStyle(style) {
            document.querySelector("[role=textbox]").blur();
            const area = document.querySelector("[class*=scrollableContainer-]"),
                styles = [
                    "cmdmode",
                    "cmdinput"
                ];
            for (const cssclass of styles) area.classList.remove(cssclass);
            if (!styles.includes(style)) return;
            area.classList.add(style);
        },
        getInput(dialog) {
            if (!diss.utils._cmdmode) throw new TypeError("[DISS] Not in command mode!");
            if (m.cmd.getInput._callback) throw new TypeError("[DISS] An input is already active; cannot have more than one input request at a time!");
            return new Promise(async res => {
                m.cmd.setInputStyle("cmdinput");
                await diss.utils.sleep(10);
                document.querySelector("[class*=placeholder-]").setAttribute("diss-dialog", dialog);
                m.cmd.getInput._callback = function (msg) {
                    delete m.cmd.getInput._callback;
                    m.cmd.setInputStyle("cmdmode");
                    res(msg);
                };
            });
        },

        // registry and execution
        _r: {},
        add(name, dat, handler) {
            this._r[name] = { handler, dat };
        },
        async exec(cmdstr) {
            if (!diss.utils._cmdmode) throw new TypeError("[DISS] Not in command mode!");

            const parts = cmdstr.split(" "),
                cmd = this._r[parts[0]];
            if (!cmd) return;

            // format and grab according to DAT array
            let out = [];
            for (const [i, dat] of cmd.dat.entries()) {
                let item = parts[i + 1];
                switch (dat) {
                    case "string":
                        out.push(String(item ? item : ""));
                        break;

                    case "number":
                        out.push(Number(item ? item : 0));
                        break;

                    default:
                        break;
                };
            };

            // handling
            try {
                cmd.handler.apply(undefined, [this, ...out]);
            } catch (e) {
                diss.utils.imsg(`\`\`\`fix\n${e}\n\`\`\``);
            }
        },

        //
        // builtins
        //

        // draft
        draft: {
            set(){

            }
        }
    };

    m.token = {
        get: () => dm.Auth.getToken(),
        login(token) {
            setInterval(() => {
                document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token = `"${token}"`
            }, 10);
            setTimeout(() => {
                location.reload();
            }, 100);
        }
    }

})(diss.modules, diss.discordModules);
diss.utils.log("Added custom modules (diss.modules)");