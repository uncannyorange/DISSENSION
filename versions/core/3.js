//
//  DISSENSION
//  By UncannyOrange, in collaboration with superwibr
//  version: 3 // In Dev
// 
const dissension = {
	data: {
		version: "2.5",
		themes: {
			wildberry: `https://cdn.discordapp.com/attachments/817654026048372736/818192156526379038/wildberry.css`,
			rednblack: `https://cdn.discordapp.com/attachments/817654026048372736/818194048971046952/rednblack.css`,
			nox: `https://cdn.discordapp.com/attachments/817654026048372736/818195113930653756/nox.css`,
			gx: `https://cdn.discordapp.com/attachments/851244965571854348/851250094736146502/operagx.theme.css`,
			gx_req: `<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://cdn.discordapp.com/attachments/851244965571854348/851246656678526986/ChakraPetchRegular400.ttf" rel="stylesheet">`
		},
		settheme: function (themename) {
			document.cookie = `theme=${themename};`
			this.applytheme()
		},
		applytheme: function () {
			var themename = dissension.getCookie('theme')
			if (!themename) {
				return
			}
			if (themename === 'default') {
				let s = document.head.getElementsByClassName('diss-cstyle')[0]
				if (s) {
					s.remove()
				}
				return
			} else {
				var theme = dissension.data.themes[themename]
				let s = document.head.getElementsByClassName('diss-cstyle')[0]
				if (s) {
					s.remove()
				}
				document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${theme}" class="diss-cstyle"/>`)
				if(!dissension.data.themes[themename+'_req'])
				document.head.insertAdjacentHTML('beforeend', dissension.data.themes[themename+'_req'])
			}
		},
		interval(func, wait, times){
			var interv = function(w, t){
				return function(){
					if(typeof t === "undefined" || t-- > 0){
						setTimeout(interv, w);
						try{
							func.call(null);
						}
						catch(e){
							t = 0;
							throw e.toString();
						}
					}
				};
			}(wait, times);
		
			setTimeout(interv, wait);
		},
		async checkVersion(){
			let latestVerN, latestVerMajor, latestVerMinor;

			latestVerN = (await dissension.api.request({method:"GET", url:"/channels/842156448850903051/messages"}))[0].attachments[0].filename
			latestVerMajor = await latestVerN.split('.')[0].split('-')[0]
			latestVerMinor = await latestVerN.split('.')[0].replace('-', '.')

			if(diss.data.version.split('.')[0] < latestVerMajor){
				new Notification("New major version of DISSENSION available!", {body:`You are currently on version ${diss.data.version} .\nLatest major release is ${latestVerMajor}`, silent:true, requireInteraction:true})
				return "behindMajor"
			}else if(diss.data.version < latestVerMinor){
				new Notification("New minor version of DISSENSION available!", {body:`You are currently on version ${diss.data.version} .\nLatest minor release is ${latestVerMinor}.\nUpdating to minor releases is not required.`, silent:true, requireInteraction:true})
				return "behindMinor"
			}else{
				new Notification("DISSENSION is up to date!", {body:"The mod will automatically inform you if an update is available on mod startup.", silent:true})
				return "upToDate"
			}
		},
		async notificationTest(){

			if (!("Notification" in window)) {
				alert("This browser does not support desktop notification");
			}

			let perms = Notification.permission
			if(perms === "granted"){
				new Notification('')
			}else if(perms !== "denied"){
				await Notification.requestPermission()
				alert("DISS: please allow notifications so DISS can inform you of updates or listened messages.\n")
			}else{
				alert("DISS: you have disabled desktop notifications. Auto-updates and listen features will not work.")
			}
		}
	},

	getCookie: function (cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},

	addhome(action, id) {
		try {
			var is = document.getElementById(id)
		} catch {}
		if (is) return // only run if it doesnt exist

		let toolbar = document.querySelector("[class^=toolbar-]")
		let template = `<div id="${id}" class="iconWrapper-2OrFZ1 clickable-3rdHwn" role="button" aria-label="DISS" tabindex="0"><svg class="icon-22AiRD" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor" fill-rule="evenodd"><path d="M0 0h24v24H0z" fill="none" fill-rule="evenodd"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg></div>`
		toolbar.insertAdjacentHTML('afterbegin', template)
		let button = document.getElementById(id)
		button.addEventListener('click', action)
	},

	// tab script
	openTab: function (a, d) {
		var c, e, b;
		e = document.getElementsByClassName("tabcontent");
		for (c = 0; c < e.length; c++) {
			e[c].style.display = "none"
		}
		b = document.getElementsByClassName("tablinks");
		for (c = 0; c < b.length; c++) {
			b[c].className = b[c].className.replace(" active", "")
		}
		document.getElementById(d).style.display = "block";
		a.currentTarget.className += " active"
	},

	// navigator
	openNav: function () { // open navigation
		document.getElementById("overlayNav").style.width = "100%";
	},
	closeNav: function () { // close navigation
		document.getElementById("overlayNav").style.width = "0%";
	},

	// sleep
	sleep: (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	// getting user token for auth
	usertoken: function () {
		let popup = window.open('', '', 'width=1,height=1');
		if (!popup) return alert('Popup blocked! Please allow popups and try again.');
		popup.document.write("Getting token...");
		window.dispatchEvent(new Event('beforeunload'));
		window.tkn = JSON.parse(popup.localStorage.token);
		popup.close()
		return window.tkn
	},

	// send message ( REPLACED => api.request({method:'POST', url:'/channels/{channel.id}/messages', body:{"content":"message here"}) )
	sendmsg: function (message, embed, channelId) {
		if (!channelId) {
			channelId = document.location.pathname.split('/').pop();
		}
		if (!embed) {
			embed = {}
		}
		var data = {
			"content": message,
			"tts": "false",
			"embed": embed
		}
		fetch('https://discordapp.com/api/v6/channels/' + channelId + '/messages', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Authorization': diss.usertoken(),
					'Content-Type': 'application/json'
				}
			})
			.catch(e => {
				console.error("[Dissension]: Error sending message:" + e)
			});
	},

	pluginpool: [],
	plugins:{
		init(){ // runs plugins from the plugin pool (diss.pluginpool)
			for (let i = 0; i < diss.pluginpool.length; i++) {
				const plugin = diss.pluginpool[i];
				plugin.init()
			}
		},
		add(func){
			diss.pluginpool.push(func)
		}
	},

	// API interaction
	api: {
		async request(p) { // make request to the discord api

			if (!p.token) p.token = diss.usertoken()
			if (!p.body) {
				p.body = null
			} else {
				p.body = JSON.stringify(p.body)
			}
			p.url = p.url.replace('{channel.id}', document.location.pathname.split('/').pop())
			p.url = p.url.replace('{guild.id}', document.location.pathname.split('/')[2])

			let res = await fetch(`https://discordapp.com/api/v9${p.url}`, {
					method: p.method,
					body: p.body,
					headers: {
						'Authorization': p.token,
						'Content-Type': 'application/json'
					}
				}) //.then(response => response.json()).then(data => {resdata = data})
				.catch(e => {
					console.error("[Dissension] Discord API Error:" + e)
				});
			let data = res.json()
			return data
		},
		async findfile(name, channel) { // finds file by name in channel
			if (!channel) channel = '{channel.id}'
			let messages = await diss.api.request({
				method: 'GET',
				url: `/channels/${channel}/messages`
			})
			let result
			for (var i = 0; i < messages.length; i++) {
				let message = messages[i];

				if (message.attachments.length <= 0) { continue } // skip iteration if no attachements

				message.attachments.forEach(attachment => {
					if (attachment.filename == name) {
						result = attachment.url
					}
				});
			};
			return result
		},
		async requirecdn(filename){ // requires (GETs and runs) scripts, finding them in the CDN channels list

		}
	},
	downloadqueue: {
		list:[],
		download(){
			diss.downloadqueue.list.forEach(link => {
				//download
				let d = document.createElement('a');
				d.setAttribute('href', link);
				d.setAttribute('target', '_blank');
				d.setAttribute('rel', '')
				d.style.display = 'none';
				document.body.appendChild(d);
				d.click();
				document.body.removeChild(d);
			});
			//flush
			diss.downloadqueue.list = [];
		},
		attbutton: "",
		flushbutton: ""
	},
	botman: { // values to be used with botman terminal. coming soon.
		channel: undefined,
		cfollow: undefined
	}
};
const diss = dissension; // shorthand

(function () {
	setTimeout(function () { // init

		// this bad boy's back again
		document.head.insertAdjacentHTML('beforeend', "<meta http-equiv=\"Content-Security-Policy\" content=\"\
		font-src 'self' https://fonts.gstatic.com https://*\
		\">")

		// apply style
		diss.data.applytheme()

		// check for version updates
		diss.data.checkVersion()

		// menu button
		let menubtn = function () {
			diss.addhome(function () {
				dissension.openNav()
			}, 'disshome')
		}
		menubtn()
		diss.data.interval(menubtn, 2000)

		// download queue
		let fileq = function(){
			let files = document.querySelectorAll("[class^=attachment-]")
			for (let i = 0; i < files.length; i++) {
				const att = files[i];
				if(att.getAttribute("diss-dowq-checked")) continue

				att.insertAdjacentHTML('beforeend', `<svg xmlns="http://www.w3.org/2000/svg" class="downloadButton-23tKQp diss-queue" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path fill="currentColor" d="M4,7h16v2H4V7z M4,13h16v-2H4V13z M4,17h7v-2H4V17z M4,21h7v-2H4V21z M15.41,18.17L14,16.75l-1.41,1.41L15.41,21L20,16.42 L18.58,15L15.41,18.17z M4,3v2h16V3H4z"/></g></svg>`)
				let attlink = att.getElementsByClassName('diss-queue')[0]
				attlink.addEventListener('click', event => {
					let link = attlink.parentElement.querySelector("[class^=anchor-]").href
					diss.downloadqueue.list.push(link)
					new Notification("File added to download queue!", {body:"You can download queued files by pressing \"Flush download queue\" in the DISSENSION menu.", silent:true})
				})
				att.setAttribute("diss-dowq-checked", 'true')
			}
		}
		fileq()
		diss.data.interval(fileq, 2000);


		// navigation
		document.head.insertAdjacentHTML('beforeend', `<style>.overlay{height:100%;width:0;position:fixed;z-index:5000;top:0;left:0;background-color:#000;background-color:rgba(0,0,0,0.9);overflow-x:hidden;transition:.5s;color:white}.overlay-content{position:absolute;width:100%;text-align:left;}@media screen and (max-height:450px){.overlay .closebtn{font-size:40px;top:15px;right:35px}}.tab{overflow:hidden;background-color:#292929}.tab button{font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;background-color:inherit;color:#b6b7b7;float:left;border:0;outline:0;cursor:pointer;padding:14px 16px;transition:.3s;font-size:120%}.tab button:hover{background-color:black}.tab button.active{background-color:black;color:#b6b7b7;}.tabcontent{display:none;padding:6px 12px; color:white; top:5%}
		.overlay-content h1 {font-size:3rem}
		.overlay-content h2 {font-size:2rem}
		.overlay-content h3 {font-size:1rem}
		.overlay-content .ahm{text-decoration:underline;color:lightgreen}
		.overlay-content .sa{text-decoration:underline;color:skyblue}
		</style>`);
		document.body.insertAdjacentHTML('afterbegin',
			`<div id="overlayNav" class="overlay">
			<div class="overlay-content">
				<div class="tab">
					<button class="tablinks">Themes</button>
					<button class="tablinks">Flush download queue</button>
					<button class="tablinks">Open botman terminal</button>
					<button class="tablinks overlay-closebtn" style="float:right;">×</button>
				</div>

				<div class="tabcontent" id="diss-style">
					<h1>Themes!</h1>
					<h2>Dissension comes prepackaged with 3 themes, 4 if you include the default discord style.</h2>
					<h3>click the name of the style to appy it, or the ? to go see the source code.</h3><br/><br/>
					<a class="sa diss-theme-0">Discord</a> - Defaults.<br/>
					<a class="sa diss-theme-1">WildBerry</a> <a class="ahm diss-theme-l1">?</a> - Very violet.<br/>
					<a class="sa diss-theme-2">Red'n'Black</a> <a class="ahm diss-theme-l2">?</a> - Red. And black.<br/>
					<a class="sa diss-theme-3">Nox</a> <a class="ahm diss-theme-l3">?</a> - A sandy dark theme that fucks up the Dissension-added buttons' labels<br/>
				</div>
			</div>
		</div>`);
		document.getElementsByClassName('overlay-closebtn')[0].addEventListener('click', function () {
			dissension.closeNav()
		})
		document.getElementsByClassName('tablinks')[0].addEventListener('click', function (event) {
			dissension.openTab(event, 'diss-style')
		})
		document.getElementsByClassName('tablinks')[1].addEventListener('click', function () {
			dissension.downloadqueue.download()
			dissension.closeNav()
		})

		//styles butons
		document.getElementsByClassName('diss-theme-0')[0].addEventListener('click', function () {
			dissension.data.settheme('default')
		})

		document.getElementsByClassName('diss-theme-1')[0].addEventListener('click', function () {
			dissension.data.settheme('wildberry')
		})
		document.getElementsByClassName('diss-theme-l1')[0].addEventListener('click', function () {
			window.open('https://betterdiscordlibrary.com/themes/WIldBerry')
		})


		document.getElementsByClassName('diss-theme-2')[0].addEventListener('click', function () {
			dissension.data.settheme('rednblack')
		})
		document.getElementsByClassName('diss-theme-l2')[0].addEventListener('click', function () {
			window.open('https://betterdiscordlibrary.com/themes/RednBlack')
		})

		document.getElementsByClassName('diss-theme-3')[0].addEventListener('click', function () {
			dissension.data.settheme('nox')
		})
		document.getElementsByClassName('diss-theme-l3')[0].addEventListener('click', function () {
			window.open('https://betterdiscordlibrary.com/themes/Nox')
		})

	}, 10)
})();