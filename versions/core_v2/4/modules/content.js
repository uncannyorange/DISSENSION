let head, overlay;

(async function(){
	let template = async function(file){
		return await fetch(`https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/versions/core_v2/4/content/${file}.html`).then(res => res.text())
	}

	head = await template("head");
	overlay = await template("overlay");
})()

export { head, overlay }