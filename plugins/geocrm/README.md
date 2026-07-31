# GeoTech ONE GeoCRM plugin for Codex

The GeoCRM plugin gives Codex a secure, per-person connection to GeoTech ONE boards. It uses the hosted MCP endpoint at `https://geotech-crm.web.app/api/mcp` and signs each user in through GeoCRM's Google/Firebase login. No shared API key, repository checkout, or local server is required.

## Choose an installation

### Option A — direct MCP connection

Use this when you need GeoCRM tools in Codex and do not need a Plugins-directory card. No files are downloaded from this repository.

In Codex desktop, open **Settings → MCP servers → Add server**, choose **Streamable HTTP**, enter `GeoCRM` and `https://geotech-crm.web.app/api/mcp`, save, restart, and select **Authenticate**.

Or run:

```powershell
codex mcp add geocrm `
  --url https://geotech-crm.web.app/api/mcp `
  --oauth-resource https://geotech-crm.web.app/api/mcp

codex mcp login geocrm --scopes crm.read,crm.write
codex mcp list
```

### Option B — full GeoTech ONE plugin

Use this for the branded Plugins-directory card, starter prompts, and the bundled GeoCRM workflow skill. Codex fetches only this small public marketplace repository; you do not clone the private GeoCRM application.

#### Install with the Codex desktop interface

GeoTech ONE is distributed from a public Git marketplace, so register that marketplace once:

```powershell
codex plugin marketplace add Geodesic-Games/GeoCRM_Codex
```

Then complete the installation in Codex desktop:

1. Open **Plugins** and select the refresh icon in the upper-right corner.
2. Open **Personal**, then select the **GeoTech ONE** marketplace source.
3. Search for **GeoTech ONE CRM** and open its details.
4. Select the plus or **Install** button.
5. Confirm the blue GeoTech ONE icon appears in the **Installed** row.
6. Start a new Codex task so the plugin skill and MCP tools load.

If the marketplace does not appear, run `codex plugin marketplace list`, confirm `geotech-one` is present, and refresh the Plugins page again.

#### Install entirely from the CLI

```powershell
codex plugin marketplace add Geodesic-Games/GeoCRM_Codex
codex plugin add geocrm@geotech-one
codex plugin list
```

The three commands above are the supported sequence: register the Git marketplace, install `geocrm` from the `geotech-one` marketplace, then verify the installation. Start a new Codex task after either installation method.

## Prepare GeoCRM access

An owner or administrator should:

1. Open [GeoCRM](https://crm.geotech.one/) and choose **Admin menu**.
2. Under **Permission groups**, enter a group name.
3. Choose **View only** or **Can edit**.
4. Select the boards included in the group and create it.
5. Under **Accounts**, assign the group to each person who should receive that access.

If a person belongs to overlapping groups, edit access wins for boards included by both. A direct board assignment also grants edit access. Existing permission groups created before viewer/editor access remain edit-capable for compatibility.

## Sign in and use it

Ask Codex:

> List the GeoCRM boards I can access.

On first use, Codex opens the GeoCRM authorization page. Sign in with the Google account registered in GeoCRM, review the requested scopes, and choose **Authorize GeoCRM**.

GeoCRM checks the user's current account status and board grants on every MCP request. Removing a group, changing it to view-only, removing a board, or disabling the user takes effect without issuing a new plugin credential.

Access levels:

- **View only** — list, search, and inspect permitted boards.
- **Can edit** — all view actions plus create, update, comment, move, and confirmed soft-delete actions.
- **Owner** — all non-owner-only CRM boards with edit access.

Useful requests:

- `List my GeoCRM boards and show whether each is view-only or editable.`
- `Search Contacts for people connected to Acme.`
- `Show the Deals schema before creating anything.`
- `Preview moving these Production items to Review without applying it.`
- `Add this meeting note to the selected contact.`

Deleting an item requires the exact current item name as confirmation and uses GeoCRM's existing soft-delete audit path.

## Update or remove

Update the public plugin marketplace and reinstall the current package:

```powershell
codex plugin marketplace upgrade geotech-one
codex plugin add geocrm@geotech-one
```

Remove the plugin:

```powershell
codex plugin remove geocrm@geotech-one
```

Remove a direct MCP connection:

```powershell
codex mcp logout geocrm
codex mcp remove geocrm
```

Removing the local connection does not change GeoCRM user access. A GeoCRM administrator can revoke server access immediately by disabling the account or removing its board grants.

## Security notes

- OAuth uses authorization code flow with PKCE, short-lived access tokens, and rotating refresh tokens.
- The plugin never receives a Google password or a reusable Firebase credential.
- GeoCRM enforces the signed-in person's live board viewer/editor grants on every tool call.
- The local stdio MCP remains available only in the private GeoCRM application repository for specialized developer/API-key workflows.

Public installation guide: <https://geotech-crm.web.app/docs/codex-plugin/>
