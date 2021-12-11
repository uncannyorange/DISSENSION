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
		window.CSPDodge = function(){
			if(!new.target) throw TypeError("Artificial constructor cspdodge cannot be invoked without \'new\'");

			/* dodger window */
			this._window = window.open('https://uncannyorange.github.io/cspdodge.html', '_blank', 'width=1,height=1');
			setTimeout(window.focus, 1000);

			this.request = async function(url){
				return new Promise(res => {
					window.addEventListener('message', e => {
						res(e.data);
					});

					this._window.postMessage(url, '*');
				});
			};

			this.close = function(){
				this._window.close()
				for(const entry of Object.keys(this)){
					delete this[entry];
				};
				this.closed = true
			};
		};
	};

	/* check for location */
	if (location.href.startsWith('https://discord.com/channels/')) { /* is discord; run core */setup(); } else {
		/* incorrect location; load discord */
		location = "https://discord.com/channels/@me";
	};
})();