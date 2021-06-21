class Plugin {
	constructor(name, type, params) {
		this.name = name;
		this.type = type;
		this.params = params;

		switch (type) {
			case "":
				{

				}
				break;

			case "plugin": default: {
				
				};break;
		}
	}
	load(){
		diss._pluginIndex[this.name] = this
		diss.load
	}
	unload(){
		delete diss._pluginIndex[this.name]
	}
}

const pluginManager = {
	unloadAll(){
		for (let i = 0; i < diss._pluginIndex.length; i++) {
			const plugin = diss._pluginIndex[i];
			plugin.unload()
		}
	},
	get(name){
		return window.diss._pluginIndex[name]
	},
}

export { Plugin, pluginManager }