diss.modules = {
    getNonce: (window.BigInt != null) ? () => (BigInt(Date.now() - 14200704e5) << BigInt(22)).toString() : () => Date.now().toString(),

    // info & message related things
    clyde: msg => dm.MessageActions.sendBotMessage(m.current.channelId, msg),
    showMessage: (chanid, msgobj) => dm.MessageActions.receiveMessage(chanid, diss.utils.mergeDeep({ id: this.getNonce(), type: 0, flags: 64, content: ".", channel_id: m.current.channelId, author: { id: 0, discriminator: "4", username: "User" }, embeds: [], mentions: [], timestamp: "2014-12-31T01:01:01", mentioned: !0 }, msgobj)),

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
            console.log(imports);;
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

    }
}