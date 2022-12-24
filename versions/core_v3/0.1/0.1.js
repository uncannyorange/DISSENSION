/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr
 * @version 3.0.0 core
 */

if (typeof diss == "undefined") window.diss = new Object();
if (typeof dfetch == "undefined") throw new TypeError("dfetch not found, cannot load dissension")

// Fetching and Caching
(async function () {

    const rooturl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/versions/core_v3/",
        coreurl = `${rooturl}0/`,
        vernum = await dfetch(`${rooturl}stable.txt`).then(res => res.text());

    
    await dfetch(`${coreurl}utils.js`, "DISS23UTILS").then(res => res.text()).then(text => (0, eval)(text));
    await dfetch(`${coreurl}bootstrap.js`, "DISS23BOOTSTRAP").then(res => res.text()).then(text => (0, eval)(text));
    await dfetch(`${coreurl}modules.js`, "DISS23MODULES").then(res => res.text()).then(text => (0, eval)(text));
    await dfetch(`${coreurl}cmd.js`, "DISS23CMD").then(res => res.text()).then(text => (0, eval)(text));
    document.head.insertAdjacentHTML('beforeend', `<style>${await dfetch(`${coreurl}styles.css`, "DISS23STYLES").then(res => res.text())}</style>`);
})();