const Plugin = function(name, events){
	diss.pluginManager.register(name, events)
	this.events = diss._events
}

const pluginManager = {
	register(name){
		if(!BdApi.Plugins.isEnabled(name)) throw "[DISSENSION] Cannot register; The addon is not enabled."

	},
	unregisterAll(){
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