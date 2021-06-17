/**
 * @name DISSENSION
 * @description Here is DISSENSION that has been turned into a BetterDiscord plugin.
 * @author UncannyOrange
 * @version 5.0
 * 
 * @source https://github.com/uncannyorange/DISSENSION
 */

 module.exports = class {
	async start(){
		let s = document.createElement('script')
		s.src = "https://uncannyorange.github.io/DISSENSION/versions/core_v2/5/index.js"
		s.type = "module";
		document.head.appendChild(s)
	}
	stop(){
		
	}
}