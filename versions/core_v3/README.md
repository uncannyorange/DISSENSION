# DISSENSION Core v3
## API documentation
### `plugin` API
You can register a plugin using the `diss.plugins.registerPlugin()` method. It accepts 2 arguments, one being an object with the properties `name`, `displayName`, `description`, `version` and `repoURL` for info, and the other being an object with the `enable` and `disable` methods which run when the plugin runs those actions.

A registered plugin can be enabled and disabled with the `diss.plugins.enable(name)` and `diss.plugins.disable(name)` methods.
When it is enabled or disabled, the plugin's `enable` and `disable` methods are passed in `diss.plugins` as an argument, which is meant to be destructured to get the methods you need to properly set up the plugin.