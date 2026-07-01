# pi-copy-clear

A [Pi](https://pi.dev) extension that binds keyboard shortcuts to editor actions:

- **Copy + clear** the current prompt to the system clipboard (special `"copy-clear"` action).
- **Submit** an arbitrary text payload to the agent as a user message — useful for fixed slash commands or canned prompts.

## Default bindings

| Shortcut | Action |
|----------|--------|
| `Ctrl+X` | Copies the current prompt to the clipboard and clears the editor |

## Install

### From GitHub

```bash
pi install git:github.com/Squirreljetpack/pi-copy-clear
```

## Usage

While typing in Pi's input editor, press one of the configured shortcuts:

- **Ctrl+X** — Copies the entire current prompt to your system clipboard and clears the editor. Only acts when the editor has text; a brief notification confirms the action.
- Any other configured shortcut — Submits its `text` payload to the agent as a user message, exactly as if you had typed it and pressed Enter.

## Configuration

Bindings live in Pi's `settings.json` under `pi-copy-clear.bindings`, as an array of `{ key, text }` objects. When `text` equals the special string `"copy-clear"`, the binding performs the copy+clear action; any other string is submitted to the agent as a user message.

Global settings: `~/.pi/agent/settings.json`
Project settings: `.pi/settings.json` (overrides global)

```json
{
  "pi-copy-clear": {
    "bindings": [
      { "key": "ctrl+x", "text": "copy-clear" },
      { "key": "ctrl+e", "text": "/exit" },
      { "key": "ctrl+l", "text": "look at the failing tests and propose a fix" }
    ]
  }
}
```

`key` accepts any Pi key identifier, for example:

- `"ctrl+x"`
- `"ctrl+shift+x"`
- `"alt+c"`
- `"ctrl+alt+c"`

`text` accepts any string. Use `"copy-clear"` to trigger the copy+clear action; any other value is submitted to the agent as a user message (e.g. `"/tree"`, `"/compact"`, `"hello"`).

> Note: built-in interactive slash commands like `/tree` and `/model` are handled by Pi's editor when you press Enter, not by the agent. A shortcut that submits `/tree` will send the literal text `/tree` to the LLM as a user message. To bind a shortcut to a built-in command, configure it in your `keybindings.json` under its action id (for example `{ "app.session.tree": ["ctrl+shift+t"] }`).

After editing `settings.json`, run `/reload` in Pi to apply the change.

## Development

```bash
npm install
npm run typecheck
```

## License

MIT
