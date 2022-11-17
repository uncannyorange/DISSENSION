# DISSENSION Core v3
## API documentation
### `CMD` API
To register a command (or subcommand) you need to pass in:
- The parent command name (for direct children only)
- The command name
- The DAT (or Data Accepted Type) array
- The handler function
<br/>
The DAT is an array of strings which can be:
- `string` to accept a spaceless string
- `number` to accept a number
<br/>
The handler for your command is passed in a reference to the `cmd` module as the fist argument, like the python `self`. The results of the DATs are then spread as the next arguments.