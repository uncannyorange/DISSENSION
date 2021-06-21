//
//  DISSENSION
//	utlilities
//
const util = {}

util.eval = function(c){
	return Function(`
		"use strict";
		return (${c})
	`)()
}

util.sleep = function(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

util.interval = function(callback, ms, times){
	let r = function(){
		var interv = function(w, t){
			return function(){
				if(r.s == true) return;
				if(typeof t === "undefined" || t-- > 0){
					setTimeout(interv, w);
					try{
						callback.call(null);
					}
					catch(e){
						t = 0;
						throw e.toString();
					}
				}
			};
		}(ms, times);
	
		setTimeout(interv, ms);
	}
	r.s = false
	r.stop = function(){
		r.s = true
	}

	r()
	return r;
}


export { util }