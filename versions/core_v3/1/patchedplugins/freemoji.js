// DiscordFreeEmoji by An0, modified to work in DISSENTION

/**
 * @name FreeEmojis
 * @version 1.7
 * @description Link emojis if you don't have nitro! Type them out or use the emoji picker!
 * @author An0
 * @source https://github.com/An00nymushun/DiscordFreeEmojis
 * @updateUrl https://raw.githubusercontent.com/An00nymushun/DiscordFreeEmojis/main/DiscordFreeEmojis.plugin.js
 */

/*@cc_on
@if (@_jscript)
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    shell.Popup("It looks like you've mistakenly tried to run me directly. \\n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else @*/


var FreeEmojis = (() => {

    'use strict';

    const BaseColor = "#0cf";

    var Discord;
    var Utils = {
        Log: (message) => { console.log(`%c[FreeEmojis] %c${message}`, `color:${BaseColor};font-weight:bold`, "") },
        Warn: (message) => { console.warn(`%c[FreeEmojis] %c${message}`, `color:${BaseColor};font-weight:bold`, "") },
        Error: (message) => { console.error(`%c[FreeEmojis] %c${message}`, `color:${BaseColor};font-weight:bold`, "") }
    };

    var Initialized = false;
    var searchHook;
    var parseHook;
    var getEmojiUnavailableReasonHook;
    function Init() {
        Discord = { window: (typeof (unsafeWindow) !== 'undefined') ? unsafeWindow : window };

        const { findModule, findModuleByProps } = diss.Webpack;

        let emojisModule = findModuleByProps(['getDisambiguatedEmojiContext', 'searchWithoutFetchingLatest']);
        if (emojisModule == null) { Utils.Error("emojisModule not found."); return 0; }

        let messageEmojiParserModule = findModuleByProps(['parse', 'parsePreprocessor', 'unparse']);
        if (messageEmojiParserModule == null) { Utils.Error("messageEmojiParserModule not found."); return 0; }

        let emojiPermissionsModule = findModuleByProps(['getEmojiUnavailableReason']);
        if (emojiPermissionsModule == null) { Utils.Error("emojiPermissionsModule not found."); return 0; }

        searchHook = Discord.original_searchWithoutFetchingLatest = emojisModule.searchWithoutFetchingLatest;
        emojisModule.searchWithoutFetchingLatest = function () { return searchHook.apply(this, arguments); };

        parseHook = Discord.original_parse = messageEmojiParserModule.parse;
        messageEmojiParserModule.parse = function () { return parseHook.apply(this, arguments); };

        getEmojiUnavailableReasonHook = Discord.original_getEmojiUnavailableReason = emojiPermissionsModule.getEmojiUnavailableReason;
        emojiPermissionsModule.getEmojiUnavailableReason = function () { return getEmojiUnavailableReasonHook.apply(this, arguments); };


        Utils.Log("initialized");
        Initialized = true;

        return 1;
    }

    function Start() {
        if (!Initialized && Init() !== 1) return;

        const { original_parse, original_getEmojiUnavailableReason } = Discord;

        searchHook = function () {
            let result = Discord.original_searchWithoutFetchingLatest.apply(this, arguments);
            console.log({ result, arguments })
            result.unlocked.push(...result.locked);
            result.locked = [];
            return result;
        }

        function replaceEmoji(parseResult, emoji) {
            parseResult.content = parseResult.content.replace(`<${emoji.animated ? "a" : ""}:${emoji.originalName || emoji.name}:${emoji.id}>`, emoji.url.split("?")[0] + "?size=48");
        }

        parseHook = function () {
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

        getEmojiUnavailableReasonHook = function () {
            return null;
        }
    }

    function Stop() {
        if (!Initialized) return;

        searchHook = Discord.original_searchWithoutFetchingLatest;
        parseHook = Discord.original_parse;
        getEmojiUnavailableReasonHook = Discord.original_getEmojiUnavailableReason;
    }

    return function () {
        return {
            getName: () => "DiscordFreeEmojis",
            getShortName: () => "FreeEmojis",
            getDescription: () => "Link emojis if you don't have nitro! Type them out or use the emoji picker!",
            getVersion: () => "1.7",
            getAuthor: () => "An0",

            start: Start,
            stop: Stop
        }
    };

})();