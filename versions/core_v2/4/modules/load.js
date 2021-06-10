export const load = async function(){setTimeout(function () { // init
	
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

}, 10)};