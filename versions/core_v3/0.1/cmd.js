diss.utils._cmdmode = false;
(function (cmd) {
    //==============================//
    // registering default commands //
    //==============================//

    //
    // help
    //
    cmd.add("help", ["string"], (self, cmdname) => {
        console.log(cmdname)
        if (!cmdname) diss.utils.imsg("", [{
            "type": "rich",
            "title": "Command Mode Help",
            "description": "Command mode is the main way to interact with DISSENSION. Here are a few commands to get you started",
            "color": 16290583,
            "fields": [
                {
                    "name": "draft",
                    "value": "The `draft` command allows you to save plaintext to your browser's local storage to send or manipulate.",
                    "inline": true
                },
                {
                    "name": "emote (save | copy)",
                    "value": "The `emote` command allows you to save image links and send them as custom reaction emojis. \nFor saving: `emote save <name> <url>`\nFor copying: `emote copy <name>`",
                    "inline": true
                },
                {
                    "name": "token (get | login)",
                    "value": "The `token` command allows you to get, set, and save discord account tokens.\n`token get` : gets your discord token.\n`token login <token>` : switch accounts and log in with a discord token.",
                    "inline": true
                },
            ]
        }])
    });

    //
    // draft
    //
    cmd.add("draft", ["string"], async (self, action) => {
        const drafttext = await self.getInput("Write draft");
        console.log(drafttext)
    })

    //
    //  token
    //
    cmd.add("token", ["string", "string"], (self, action, token) => {
        if(action == "get"){
            diss.utils.imsg(`Your discord token is:\n||\`${diss.modules.token.get()}\`||`)
        }else if (action == "login"){
            diss.utils.imsg("Logging in with token...")
            diss.modules.token.login(token);
        }
    })

    //
    // patch sendMessage
    //
    diss.utils.patch(diss.discordModules.MessageActions, "sendMessage", (...args) => {
        const [messageId, message, x1, x2] = args;
        // console.log(message)

        // toggle cmdmode
        if (message.content == "$cmd") {
            diss.utils._cmdmode ^= 1;
            cmd.setInputStyle(diss.utils._cmdmode ? "cmdmode" : "default");
            diss.utils.log(`command mode set to: ${!!diss.utils._cmdmode}`);
        };

        // getting input
        const cb = diss.modules.cmd.getInput._callback
        if (cb) cb(message.content);

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