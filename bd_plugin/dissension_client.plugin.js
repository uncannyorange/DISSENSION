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
		let version = "3"
		let diss = await fetch(`https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/versions/core/${version}.js`).then(res => res.text())
		diss = (function(){ return Function("("+diss+")")() })()
		window.diss = diss
	}
	stop(){
		
	}
}