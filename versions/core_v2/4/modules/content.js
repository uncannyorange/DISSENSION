let ctemplate = async function(file){
	return await fetch(`https://uncannyorange.github.io/DISSENSION/versions/core_v2/4/content/${file}.html`).then(res => res.text())
};

export default ctemplate