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