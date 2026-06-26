# pi-copy-clear

A [Pi](https://pi.dev) extension that copies the current prompt input to the system clipboard and clears the editor, bound to **Ctrl+X**.

## Install

### As a local Pi package

From this directory:

```bash
pi install .
```

Or add it to your project settings:

```bash
pi install . -l
```

### As a global extension for quick testing

```bash
pi -e ./src/index.ts
```

## Usage

While typing in Pi's input editor, press **Ctrl+X** to copy the entire current prompt to your system clipboard and clear the editor.

A brief notification confirms the action.

## Keybinding

The shortcut is registered via Pi's extension shortcut API. If **Ctrl+X** conflicts with your terminal or a custom `keybindings.json` binding, you can override it in `~/.pi/agent/keybindings.json` or change the key in `src/index.ts`.

## Development

```bash
npm install
npm run typecheck
```

## License

MIT
