diss.p.registerPlugin({
    name: "freeemojis",
    displayName: "this.storeFreeEmojis",
    description: "Link emojis if you don't have nitro! Type them out or use the emoji picker!",
    repoURL: "https://github.com/An00nymushun/this.storeFreeEmojis"
},
{
    enable() {
        if (!this.Initialized && this.Init() !== 1) return;

        const { original_parse, original_getEmojiUnavailableReason } = this.store;

        this.searchHook = function () {
            let result = Discord.original_searchWithoutFetchingLatest.apply(this, arguments);
            console.log({ result, arguments })
            result.unlocked.push(...result.locked);
            result.locked = [];
            return result;
        }

        function replaceEmoji(parseResult, emoji) {
            parseResult.content = parseResult.content.replace(`<${emoji.animated ? "a" : ""}:${emoji.originalName || emoji.name}:${emoji.id}>`, emoji.url.split("?")[0] + "?size=48");
        }

        this.parseHook = function () {
            let result = original_parse.apply(this, arguments);

            if (result.invalidEmojis.length !== 0) {
                for (let emoji of result.invalidEmojis) {
                    replaceEmoji(result, emoji);
                }
                result.invalidEmojis = [];
            }
            let validNonShortcutEmojis = result.validNonShortcutEmojis;
            for (let i = 0; i < validNonShortcutEmojis.length; i++) {
                const emoji = validNonShortcutEmojis[i];
                if (!emoji.available) {
                    replaceEmoji(result, emoji);
                    validNonShortcutEmojis.splice(i, 1);
                    i--;
                }
            }

            return result;
        };

        this.getEmojiUnavailableReasonHook = function () {
            return null;
        }
    },
    disable() {
        if (!this.Initialized) return;

        this.searchHook = this.store.original_searchWithoutFetchingLatest;
        this.parseHook = this.store.original_parse;
        this.getEmojiUnavailableReasonHook = this.store.original_getEmojiUnavailableReason;
    },

    store: {},
    Initialized: false,
    getEmojiUnavailableReasonHook: undefined,
    searchHook: undefined,
    parseHook: undefined,
    Init() {
        this.searchHook = this.store.original_searchWithoutFetchingLatest = diss.dm.Emojis.searchWithoutFetchingLatest;
        diss.dm.Emojis.searchWithoutFetchingLatest = function () { return this.searchHook.apply(this, arguments); };

        this.parseHook = this.store.original_parse = diss.dm.MessageEmojiParser.parse;
        diss.dm.MessageEmojiParser.parse = function () { return this.parseHook.apply(this, arguments); };

        this.getEmojiUnavailableReasonHook = this.store.original_getEmojiUnavailableReason = diss.dm.EmojiPermissions.getEmojiUnavailableReason;
        diss.dm.EmojiPermissions.getEmojiUnavailableReason = function () { return this.getEmojiUnavailableReasonHook.apply(this, arguments); };


        diss.u.log("[FreeEmojis] initialized");
        this.Initialized = true;

        return 1;
    }
});