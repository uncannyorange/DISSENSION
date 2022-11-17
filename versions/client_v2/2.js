/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr 
 * 
 * @version 2.2.0 client
 */

(async dissension => {
    const rawurl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/";

    const setup = async function () {
        // creating CSPdodge
        const CSPDodge = function (url, name = 'DISS23DEFAULTCOMMS') {
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

        // getting core
        const sv = (await CSPDodge(`${rawurl}versions/core_v3/stable.txt`, 'DISS23-STABLEVER')).split(":")[0];
        eval(await CSPDodge(`${rawurl}versions/core_v3/${sv}/${sv}.js`, 'DISS23-CORESCRIPT'));
    };

    // check for location
    location.href.startsWith('https://discord.com/channels/')
        ? setup()
        : (location = "https://discord.com/channels/@me");
})();