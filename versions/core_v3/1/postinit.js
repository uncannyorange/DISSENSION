// define remaining builtins
diss.p.registerPlugin({ name: "localstorage", displayName: "Local Storage", description: "Manage your local storage, which contains your local discord and dissention settings." }, {
    enable() {

    },
    disable() { }
})


// enable coreutil plugins
diss.p.enable("cmd");
diss.p.enable("plugins");
diss.p.enable("css");

// activate plugins

diss.u.log("post-initialization complete");