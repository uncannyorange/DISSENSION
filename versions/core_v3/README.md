# DISSENSION Core v3
## Getting Started
(this documentation is for core 3.1+)
### Commands
Most of Dissention relies on the *command mode*. This mode is toggleable by typing `$cmd` in chat. You can tell if you're in command mode when the input bar becomes bordered in orange.<br><br>

From here, you can run commands. The most basic command is `help` and its syntax is `help <command|all>`, where using the `all` parameter acts as running the `help` command for every command.<br><br>

The two main core commands are `css` and `plugin`. These respectively allow you to load themes and plugins. Your themes and plugins are stored in your browser's local storage, so erasing it will result in losing your settings, themes, etc. (You can download your localstorage as a file with the `localstorage dump` command)

### `css` and `plugin` commands
The syntax is quite self-explanatory, and goes as follows:
`<css|plugin> add <name> <url>`<br>
`<css|plugin> <enable|disable|remove> <name>`<br>
Adding a style/plugin with the same name as a pre-existing one will replace it. This may break plugins that are already running, and will only update styles after they are re-enabled. If you want to customize the code, just copy it from source, send it as an attachment to some private server, and use the attachment url.

## API documentation
This documentation is quite incomplete. Looking at the source files should be of help.
### `plugin` API
You can register a plugin using the `diss.plugins.registerPlugin()` method. It accepts 2 arguments, one being an object with the properties `name`, `displayName`, `description`, `version` and `repoURL` for info, and the other being an object with the `enable` and `disable` methods which run when the plugin runs those actions.<br><br>

A registered plugin can be enabled and disabled with the `diss.plugins.enable(name)` and `diss.plugins.disable(name)` methods.
When it is enabled or disabled, the plugin's `enable` and `disable` methods are passed in `diss.plugins` as an argument, which is meant to be destructured to get the methods you need to properly set up the plugin.
