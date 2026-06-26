import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { CONFIG_DIR_NAME, getAgentDir } from "@earendil-works/pi-coding-agent";
import { Key, type KeyId } from "@earendil-works/pi-tui";
import clipboard from "clipboardy";

const DEFAULT_BIND: KeyId = Key.ctrl("x");
const SETTINGS_KEY = "pi-copy-clear";

interface ExtensionSettings {
  bind?: KeyId;
}

function loadSettings(): ExtensionSettings {
  const globalPath = join(getAgentDir(), "settings.json");
  const projectPath = join(process.cwd(), CONFIG_DIR_NAME, "settings.json");

  let globalSettings: ExtensionSettings = {};
  let projectSettings: ExtensionSettings = {};

  if (existsSync(globalPath)) {
    try {
      const content = readFileSync(globalPath, "utf-8");
      globalSettings = (JSON.parse(content)[SETTINGS_KEY] as ExtensionSettings) ?? {};
    } catch {
      // Ignore malformed global settings.
    }
  }

  if (existsSync(projectPath)) {
    try {
      const content = readFileSync(projectPath, "utf-8");
      projectSettings = (JSON.parse(content)[SETTINGS_KEY] as ExtensionSettings) ?? {};
    } catch {
      // Ignore malformed project settings.
    }
  }

  return { ...globalSettings, ...projectSettings };
}

export default function activate(pi: ExtensionAPI) {
  const settings = loadSettings();
  const bind = settings.bind ?? DEFAULT_BIND;

  pi.registerShortcut(bind, {
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
