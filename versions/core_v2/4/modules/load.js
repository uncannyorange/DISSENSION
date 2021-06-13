import ctemplate from "./content.js";

const load = async function(){setTimeout(async function () { // init
	
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
	document.head.insertAdjacentHTML('beforeend', await ctemplate('head'));
	document.body.insertAdjacentHTML('afterbegin', await ctemplate('overlay'));

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

export { load }