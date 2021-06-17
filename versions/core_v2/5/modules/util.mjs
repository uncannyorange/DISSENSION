//
//  DISSENSION
//	utlilities
//

const evalb = function(c){
	return Function(`
		"use strict";
		return (${c})
	`)()
}
evalb.info = "Faster eval."

const sleep = function(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

export { evalb, sleep }