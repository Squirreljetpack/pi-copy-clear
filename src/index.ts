import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Key } from "@earendil-works/pi-tui";
import clipboard from "clipboardy";

export default function activate(pi: ExtensionAPI) {
  pi.registerShortcut(Key.ctrl("x"), {
    description: "Copy the current input prompt to the clipboard and clear it.",
    handler: (ctx: ExtensionContext) => {
      const currentPrompt = ctx.ui.getEditorText();

      if (currentPrompt.trim().length > 0) {
        clipboard.writeSync(currentPrompt);
        ctx.ui.setEditorText("");
        ctx.ui.notify("Prompt copied to clipboard & cleared!", "info");
      }
    },
  });
}
