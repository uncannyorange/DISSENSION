/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr 
 * 
 * @version 2.0.0 client
 */

(async dissension => {
	const setup = function () {
		/* :> */
		document.querySelector('title').innerText = "DISS | Discord";

		/* creating CSPdodge */
		window.CSPDodge = function () {
			return new Promise(res => {
				const win = window.open('https://uncannyorange.github.io/cspdodge.html', '_blank', 'width=1,height=1');
				win.blur();
				window.addEventListener('message', e => {
					res(e.data);
				});

				win.postMessage(url, '*');
			});
		};
	};

	/* check for location */
	if (location.href.startsWith('https://discord.com/channels/')) { /* is discord; run core */setup(); } else {
		/* incorrect location; load discord */
		location = "https://discord.com/channels/@me";
	};
})();