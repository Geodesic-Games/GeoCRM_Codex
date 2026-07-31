# GeoTech ONE · GeoCRM for Codex

This public repository distributes the GeoCRM Codex plugin. The CRM server, data, authentication, and permission enforcement remain hosted by GeoTech; this repository contains only the installable plugin manifest, MCP endpoint configuration, workflow skill, documentation, and brand assets.

## Install without cloning

Add the public marketplace and install the plugin:

```powershell
codex plugin marketplace add Geodesic-Games/GeoCRM_Codex
codex plugin add geocrm@geotech-one
```

Start a new Codex task after installation. On first use, GeoCRM opens its OAuth page so each person can sign in with their own authorized Google account.

For a direct MCP connection without the plugin card or local files:

```powershell
codex mcp add geocrm `
  --url https://geotech-crm.web.app/api/mcp `
  --oauth-resource https://geotech-crm.web.app/api/mcp
codex mcp login geocrm --scopes crm.read,crm.write
```

See [the complete plugin guide](plugins/geocrm/README.md) or the [hosted installation guide](https://geotech-crm.web.app/docs/codex-plugin/).

## Repository layout

```text
.agents/plugins/marketplace.json   Public Codex marketplace catalog
plugins/geocrm/.codex-plugin/      Plugin manifest
plugins/geocrm/.mcp.json           Hosted OAuth MCP connection
plugins/geocrm/skills/             GeoCRM workflow instructions
plugins/geocrm/assets/             GeoTech ONE plugin branding
```

The GeoCRM application repository consumes this repository as a Git submodule so the public plugin package remains independently installable and versioned.
