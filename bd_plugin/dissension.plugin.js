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
	}
	stop(){
		BdApi.Plugins.enable('DISSENSION')
		
	}
}