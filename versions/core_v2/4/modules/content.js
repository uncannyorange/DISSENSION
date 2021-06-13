let head, overlay;

(async function(){
	let template = async function(file){
		return await fetch(`https://uncannyorange.github.io/DISSENSION/versions/core_v2/4/content/${file}.html`).then(res => res.text())
	}

	head = await template("head");
	overlay = await template("overlay");
})()

export { head, overlay }