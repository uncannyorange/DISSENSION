/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr 
 * 
 * @version 2.3.0 client
 */

(async dissension => {
    const rawurl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/";

    const setup = async function () {
        // creating dfetch
        const dfetch = (url, name = "DEFAULT") => new Promise(res => {
            if (!dfetch.ready) throw new Error("dfetch window not ready or not initialised");
            window.addEventListener('message', function handler(e) {
                if (e.data.name !== name) return;
                e.currentTarget.removeEventListener(e.type, handler);
                res(new Response(e.data.blob, e.data.resinit));
            });
            dfetch.win.postMessage({ name, url }, '*');
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
        })
        window.addEventListener('beforeunload', () => dfetch.win.close());

        // exposing
        window.dfetch = dfetch;

        // init
        await dfetch.init();

        // getting core
        const sv = (await dfetch(`${rawurl}versions/core_v3/stable.txt`, 'DISS23-STABLEVER').then(res => res.text())).split(":")[0];
        (0, eval)(await dfetch(`${rawurl}versions/core_v3/${sv}/${sv}.js`, 'DISS23-CORESCRIPT').then(res => res.text()));
    };

    // check for location
    location.href.startsWith('https://discord.com/channels/')
        ? setup()
        : (location = "https://discord.com/channels/@me");
})();