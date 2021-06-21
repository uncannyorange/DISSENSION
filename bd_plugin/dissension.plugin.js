/**
 * @name DISSENSION
 * @description An extra layer to BetterDiscord's plugins
 * @author UncannyOrange
 * @version 5.0.2 indev
 * 
 * @source https://github.com/uncannyorange/DISSENSION
 */

 module.exports = class {
	async start(){
		let s = document.createElement('script')
		s.id = "dissension"
		s.src = "https://uncannyorange.github.io/DISSENSION/versions/core_v2/5/index.js"
		s.type = "module";
		document.head.appendChild(s)
		BdApi.showToast("test", {type:"info"})
	}
	stop(){
		window.diss.pluginManager.unloadAll()
		window.dissesnion = window.diss = undefined;
		document.getElementById('dissension').remove()
	}
}