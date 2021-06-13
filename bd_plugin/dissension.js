/**
 * @name DISSENSION
 * @description Here is DISSENSION that has been turned into a BetterDiscord plugin.
 * @author UncannyOrange
 * @version 0.1.1
 * 
 * @source https://github.com/uncannyorange/DISSENSION
 */

 module.exports = class {
	async start(){
		
		let s = document.createElement('script')
		s.src = "https://gitcdn.link/repo/uncannyorange/DISSENSION/main/versions/core_v2/4/index.js"
		s.type = "module";
		document.head.appendChild(s)
	}
	stop(){
		
	}
}