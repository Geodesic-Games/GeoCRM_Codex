import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.join(repositoryRoot, "plugins", "one");

const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(repositoryRoot, relativePath), "utf8"));

const manifest = await readJson("plugins/one/.codex-plugin/plugin.json");
const appConfig = await readJson("plugins/one/.app.json");
const marketplace = await readJson(".agents/plugins/marketplace.json");

assert.equal(manifest.apps, "./.app.json");
assert.equal("mcpServers" in manifest, false);
assert.deepEqual(appConfig, {
  apps: {
    one: {
      id: "asdk_app_6a6ee591f94881918c3a963540af007a",
      required: true,
    },
  },
});

const oneMarketplaceEntry = marketplace.plugins.find((plugin) => plugin.name === "one");
assert.ok(oneMarketplaceEntry, "ONE must remain listed in the marketplace");
assert.equal(oneMarketplaceEntry.policy?.authentication, "ON_INSTALL");

await assert.rejects(
  access(path.join(pluginRoot, ".mcp.json"), fsConstants.F_OK),
  /ENOENT/,
  "the raw MCP declaration must not ship alongside the app connector",
);

console.log("ONE plugin connector contract is valid.");
