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
- `input` to prompt for text in the message textarea. It is an exception as it is a tuple of format `["input", "input prompt"]`. This should only be used at the end of the DAT array as it will have unknown behaviour if used elsewhere.
<br/>
The handler for your command