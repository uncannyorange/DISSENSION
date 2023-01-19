// webpack bootstrap
diss.utils.cacheWebpack();
(function (fup, fm) {
    diss.discordModules = {
        // misc
        UserCache: fup(['getUser', 'getUsers', 'getCurrentUser']),
        ChannelCache: fup(['getChannel', 'getDMFromUserId']),
        GuildCache: fup(['getGuild', 'getGuilds']),
        SelectedChannelStore: fup(['getChannelId', 'getVoiceChannelId', 'getLastSelectedChannelId']),
        SelectedGuildStore: fup(['getGuildId', 'getLastSelectedGuildId']),


        PermissionEvaluator: fup(['can', 'computePermissions', 'canEveryone']),
        RelationshipStore: fup(['isFriend', 'isBlocked', 'getFriendIds']),
        PrivateChannelManager: fup(['openPrivateChannel', 'ensurePrivateChannel', 'closePrivateChannel']),
        Premium: fup(['canUseEmojisEverywhere']),

        // files
        FileUploader: fup(['upload', 'cancel', 'instantBatchUpload']),
        CloudUploadPrototype: fm(x => x.prototype?.uploadFileToCloud && x.prototype.upload)?.prototype,
        CloudUploadHelper: fup(['getUploadPayload']),

        // messages
        MessageActions: fup(["receiveMessage", "sendBotMessage"]),
        MessageQueue: fup(['enqueue', 'handleSend', 'handleEdit']),
        MessageDispatcher: fup(['dispatch', 'wait']),
        DraftStore: fup(["getDraft"]),
        DraftActions: fup(["changeDraft", "saveDraft"]),

        // auth
        Auth: fup(["getId", "getToken"]),
    };
})(diss.Webpack.findModuleByProps, diss.Webpack.findModule);
diss.utils.log("Bootstrapped discord modules (diss.discordModules)");

// localStorage patch
window.localStorage = document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage;
diss.utils.log("Patched localStorage (window.localStorage)");