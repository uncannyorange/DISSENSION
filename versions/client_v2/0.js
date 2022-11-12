/**
 * @name DISSENSION
 * @by UncannyOrange and Superwibr 
 * 
 * @version 2.0.0 client
 */

(async dissension => {
	const rawurl = "https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/";

	const setup = async function () {
		/* :> */
		document.querySelector('title').innerText = "DISS | Discord";

		/* creating CSPdodge */
		window.CSPDodge = function (url, name = 'DISS23DEFAULTCOMMS') {
			return new Promise(res => {
				const win = window.open('https://uncannyorange.github.io/cspdodge.html', '_blank', 'width=1,height=1');
				win.blur();
				window.addEventListener('message', function handler(e){
					if (e.data.status == 'ready') { /* wait for ready */
						win.postMessage({ name, url }, '*');
						return;
					};
					if(e.data.name !== name)
					console.log(e.data);
					e.currentTarget.removeEventListener(e.type, handler); /* remove event listner to avoid duplicates */
					res(e.data.resource); /* resolve with resource */
					win.close();
				});
			});
		};

		/* getting core */
		const sv = await CSPDodge(rawurl + 'versions/core_v3/stable.txt', 'DISS23-STABLEVER'),
			core = await CSPDodge(`${rawurl}versions/core_v3/${sv}.js`, 'DISS23-CORESCRIPT');

		eval(core); /* eval's yucky but eh, it's necessary */
	};

	/* check for location */
	if (location.href.startsWith('https://discord.com/channels/')) {
		/* is discord; run core */
		setup();
	} else {
		/* incorrect location; load discord */
		location = "https://discord.com/channels/@me";
	};
})();