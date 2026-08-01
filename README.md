# ONE for Codex

This public repository distributes the ONE Codex plugin. The ONE server, data, authentication, and permission enforcement remain hosted by GeoTech; this repository contains only the installable plugin manifest, MCP endpoint configuration, workflow skill, documentation, and brand assets.

## Install from Codex desktop

No terminal command or repository clone is required:

1. Open **Plugins** in Codex desktop.
2. Open **Create → Add plugin marketplace**.
3. Enter Source `Geodesic-Games/ONE_Codex`.
4. Enter Git ref `main`.
5. Leave Sparse paths empty and select **Add marketplace**.
6. Open **Personal → ONE** and install **ONE**.
7. Complete the ONE sign-in window that opens during installation.
8. Restart Codex desktop and start a new task.

Optional CLI equivalent:

```powershell
codex plugin marketplace add Geodesic-Games/ONE_Codex --ref main
codex plugin add one@geotech-one
codex plugin list
```

Installation opens ONE's OAuth page so each person can sign in with their own authorized Google account. Codex securely stores the rotating refresh credential and reuses the session across restarts and tasks until the person logs out, removes the plugin, or ONE disables the account.

For a direct MCP connection without the plugin card or local files:

```powershell
codex mcp add one `
  --url https://geotech-crm.web.app/api/mcp `
  --oauth-resource https://geotech-crm.web.app/api/mcp
codex mcp login one --scopes crm.read,crm.write
```

See [the complete plugin guide](plugins/one/README.md) or the [hosted installation guide](https://one.geotech.one/docs/codex-plugin/).

## Repository layout

```text
.agents/plugins/marketplace.json   Public Codex marketplace catalog
plugins/one/.codex-plugin/      Plugin manifest
plugins/one/.mcp.json           Hosted OAuth MCP connection
plugins/one/skills/             ONE workflow instructions
plugins/one/assets/             ONE plugin branding
```

The ONE application repository consumes this repository as a Git submodule so the public plugin package remains independently installable and versioned.
