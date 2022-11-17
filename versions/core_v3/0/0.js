/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr
 * @version 3.0.0 core
 */

if (typeof diss == "undefined") window.diss = new Object();

//CSPDodge++
diss.CSPDodge = function (url, name = 'DISS23DEFAULTCOMMS') {
    return new Promise(res => {
        const win = window.open('https://uncannyorange.github.io/cspdodge.html', '_blank', 'width=1,height=1');
        win.blur();
        window.addEventListener('message', function handler(e) {
            if (e.data.status == 'ready') return win.postMessage({ name, url }, '*');
            if (e.data.name !== name) return;
            e.currentTarget.removeEventListener(e.type, handler); // remove event listner to avoid duplicates
            res(e.data.resource); // resolve with resource
            win.close();
        });
    });
};
diss.CSPDodge.eval = async function (src, name) {
    (0, eval)(await diss.CSPDodge(src, name));
};


// Fetching and Caching
(async function () {
    const rooturl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/versions/core_v3/0/";
    await diss.CSPDodge.eval(`${rooturl}utils.js`, "DISS23UTILS");
    await diss.CSPDodge.eval(`${rooturl}bootstrap.js`, "DISS23BOOTSTRAP");
    await diss.CSPDodge.eval(`${rooturl}modules.js`, "DISS23MODULES");
    await diss.CSPDodge.eval(`${rooturl}cmd.js`, "DISS23CMD");
    document.head.insertAdjacentHTML('beforeend', `<style>${await diss.CSPDodge(`${rooturl}styles.css`, "DISS23STYLES")}</style>`);
})()