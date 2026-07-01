import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type {
	ExtensionAPI,
	ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { CONFIG_DIR_NAME, getAgentDir } from "@earendil-works/pi-coding-agent";
import { Key, type KeyId } from "@earendil-works/pi-tui";
import clipboard from "clipboardy";

const SETTINGS_KEY = "pi-copy-clear";

/** Magic `text` value that triggers the copy+clear action instead of being submitted. */
const COPY_CLEAR_ACTION = "copy-clear";

const DEFAULT_BINDINGS: ReadonlyArray<{ key: KeyId; text: string }> = [
	{ key: Key.ctrl("x"), text: COPY_CLEAR_ACTION },
];

interface Binding {
	key: KeyId;
	text: string;
}

interface ExtensionSettings {
	bindings?: Binding[];
}

function loadSettings(): ExtensionSettings {
	const globalPath = join(getAgentDir(), "settings.json");
	const projectPath = join(process.cwd(), CONFIG_DIR_NAME, "settings.json");

	let globalSettings: ExtensionSettings = {};
	let projectSettings: ExtensionSettings = {};

	if (existsSync(globalPath)) {
		try {
			const content = readFileSync(globalPath, "utf-8");
			globalSettings =
				(JSON.parse(content)[SETTINGS_KEY] as ExtensionSettings) ?? {};
		} catch {
			// Ignore malformed global settings.
		}
	}

	if (existsSync(projectPath)) {
		try {
			const content = readFileSync(projectPath, "utf-8");
			projectSettings =
				(JSON.parse(content)[SETTINGS_KEY] as ExtensionSettings) ?? {};
		} catch {
			// Ignore malformed project settings.
		}
	}

	return { ...globalSettings, ...projectSettings };
}

function isBinding(value: unknown): value is Binding {
	if (typeof value !== "object" || value === null) return false;
	const candidate = value as Partial<Binding>;
	return (
		typeof candidate.key === "string" && typeof candidate.text === "string"
	);
}

function resolveBindings(settings: ExtensionSettings): Binding[] {
	if (Array.isArray(settings.bindings)) {
		return settings.bindings.filter(isBinding);
	}
	return DEFAULT_BINDINGS.map((b) => ({ ...b }));
}

function handleCopyClear(ctx: ExtensionContext): void {
	const currentPrompt = ctx.ui.getEditorText();
	if (currentPrompt.trim().length > 0) {
		clipboard.writeSync(currentPrompt);
		ctx.ui.setEditorText("");
		ctx.ui.notify("Prompt copied to clipboard & cleared!", "info");
	}
}

function makeSubmitHandler(pi: ExtensionAPI, text: string): () => void {
	return () => {
		pi.sendUserMessage(text);
	};
}

export default function activate(pi: ExtensionAPI) {
	const settings = loadSettings();
	const bindings = resolveBindings(settings);

	for (const { key, text } of bindings) {
		if (text === COPY_CLEAR_ACTION) {
			pi.registerShortcut(key, {
				description:
					"Copy the current input prompt to the clipboard and clear it.",
				handler: handleCopyClear,
			});
		} else {
			pi.registerShortcut(key, {
				description: `Submit "${text}" to the agent.`,
				handler: makeSubmitHandler(pi, text),
			});
		}
	}
}
