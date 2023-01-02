/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr
 * @version 3.1.0 core
 */

if (typeof diss == "undefined") window.diss = new Object();

// a better dfetch
window.dfetch = (url, options = {}) => new Promise(res => {
    if (!dfetch.ready) throw new Error('dfetch window not ready or not initialised');

    let name = Math.floor(Math.random() * (1000));
    window.addEventListener('message', function handler(e) {
        if (e.data.name !== name) return;
        e.currentTarget.removeEventListener(e.type, handler);
        res(new Response(e.data.blob, e.data.resinit));
    });
    dfetch.win.postMessage({ name, url, options }, '*');
});
dfetch.init = () => new Promise(res => {
    if (dfetch.ready) return;
    dfetch.win = window.open('https://uncannyorange.github.io/DISSENSION/dfetch.html', '_blank', 'width=1,height=1');
    dfetch.win.blur();
    window.addEventListener('message', function readying(e) {
        if (e.data.status == 'ready') {
            dfetch.ready = true;
            e.currentTarget.removeEventListener(e.type, readying);
            res();
        };
    })
});
window.addEventListener('beforeunload', () => dfetch.win.close());
dfetch.loadscript = function (url) {
    return dfetch(url).then(res => res.text()).then(text => (0, eval)(text));
};

// Really, discord? You just let me do that?
document.head.insertAdjacentHTML('afterbegin', `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; child-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; object-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; connect-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; style-src 'self' 'unsafe-inline' 'unsafe-eval' https://*;">`); // this doesn't actually do much but it makes some debug simpler for devs

// Fetching and Caching
(async function () {
    await dfetch.init();

    const rooturl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/versions/core_v3/",
        coreurl = `${rooturl}0/`,
        vernum = await dfetch(`${rooturl}stable.txt`).then(res => res.text());


    await dfetch.loadscript(`${coreurl}utils.js`);
    await dfetch.loadscript(`${coreurl}bootstrap.js`);
    await dfetch.loadscript(`${coreurl}modules.js`);
    await dfetch.loadscript(`${coreurl}cmd.js`);
    document.head.insertAdjacentHTML('beforeend', `<style>${await dfetch(`${coreurl}styles.css`).then(res => res.text())}</style>`);
})();