# pi-copy-clear

A [Pi](https://pi.dev) extension that copies the current prompt input to the system clipboard and clears the editor.

Default keybinding: **Ctrl+X**.

## Install

### From GitHub

```bash
pi install git:github.com/Squirreljetpack/pi-copy-clear
```

To install into a project's local Pi config instead:

```bash
pi install git:github.com/Squirreljetpack/pi-copy-clear -l
```

### From a local clone

```bash
git clone https://github.com/Squirreljetpack/pi-copy-clear.git
cd pi-copy-clear
pi install .
```

### Quick test without installing

```bash
pi -e ./src/index.ts
```

## Usage

While typing in Pi's input editor, press the configured shortcut (default **Ctrl+X**) to copy the entire current prompt to your system clipboard and clear the editor.

A brief notification confirms the action.

## Configuration

The keybinding can be changed in Pi's `settings.json` under the `pi-copy-clear.bind` field.

Global settings: `~/.pi/agent/settings.json`
Project settings: `.pi/settings.json` (overrides global)

```json
{
  "pi-copy-clear": {
    "bind": "alt+c"
  }
}
```

`bind` accepts any Pi key identifier, for example:

- `"ctrl+x"`
- `"ctrl+shift+x"`
- `"alt+c"`
- `"ctrl+alt+c"`

After editing `settings.json`, run `/reload` in Pi to apply the change.

## Development

```bash
npm install
npm run typecheck
```

## License

MIT
