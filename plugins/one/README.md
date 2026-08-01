# ONE plugin for Codex

The ONE plugin gives Codex a secure, per-person connection to ONE boards and operational workspaces. It uses the hosted MCP endpoint at `https://geotech-crm.web.app/api/mcp` and signs each user in through ONE's Google/Firebase login. No shared API key, repository checkout, or local server is required.

## Choose an installation

### Option A — direct MCP connection

Use this when you need ONE tools in Codex and do not need a Plugins-directory card. No files are downloaded from this repository.

In Codex desktop, open **Settings → MCP servers → Add server**, choose **Streamable HTTP**, enter `ONE` and `https://geotech-crm.web.app/api/mcp`, save, restart, and select **Authenticate**.

Or run:

```powershell
codex mcp add one `
  --url https://geotech-crm.web.app/api/mcp `
  --oauth-resource https://geotech-crm.web.app/api/mcp

codex mcp login one --scopes crm.read,crm.write
codex mcp list
```

### Option B — full ONE plugin

Use this for the branded Plugins-directory card, starter prompts, and the bundled ONE workflow skill. Codex fetches only this small public marketplace repository; you do not clone the private ONE application.

#### Install with the Codex desktop interface

No terminal command is required. Register and install the public Git marketplace directly in Codex desktop:

1. Open **Plugins**.
2. Open **Create → Add plugin marketplace** in the upper-right corner.
3. Enter Source `Geodesic-Games/ONE_Codex`.
4. Enter Git ref `main`.
5. Leave Sparse paths empty. This ensures Codex receives both the marketplace catalog and plugin folder.
6. Select **Add marketplace**.
7. If necessary, select refresh, then open **Personal → ONE**.
8. Open **ONE** and select the plus or **Install** button.
9. Complete the ONE sign-in window, using the Google account registered in ONE.
10. Confirm its blue icon appears in the **Installed** row, restart Codex desktop, and start a new task.

#### Optional CLI alternative

```powershell
codex plugin marketplace add Geodesic-Games/ONE_Codex --ref main
codex plugin add one@geotech-one
codex plugin list
```

The three commands above are the supported sequence: register the Git marketplace, install `one` from the `geotech-one` marketplace, then verify the installation. Complete the browser sign-in, restart Codex desktop, and start a new task after either installation method.

## Prepare ONE access

An owner or administrator should:

1. Open [ONE](https://crm.geotech.one/) and choose **Admin menu**.
2. Open the person's account and select the **ONE workspace** access type.
3. Assign an existing permission group, or select individual boards and BackOffice sections directly.
4. Choose **View only** or **Can edit** for every direct assignment.

If a person receives overlapping grants, edit access wins for boards included by both. Existing direct assignments without an explicit level remain edit-capable for compatibility; new direct assignments default to view-only.

## Sign in and use it

Ask Codex:

> List the ONE boards I can access.

Codex opens the ONE authorization page during installation. Sign in with the Google account registered in ONE, review the requested scopes, and choose **Authorize ONE**. Codex stores the rotating refresh credential and reuses the connection across app restarts and new tasks. You sign in again only after logging out, removing the plugin, revoking the connection, or having the ONE account disabled.

ONE checks the user's current account status and board grants on every MCP request. Removing a group, changing it to view-only, removing a board, or disabling the user takes effect without issuing a new plugin credential.

Access levels:

- **View only** — list, search, and inspect permitted boards.
- **Can edit** — all view actions plus create, update, comment, move, and confirmed soft-delete actions.
- **Owner** — all non-owner-only ONE boards with edit access.

Useful requests:

- `List my ONE boards and show whether each is view-only or editable.`
- `Search Contacts for people connected to Acme.`
- `Show the Deals schema before creating anything.`
- `Preview moving these Production items to Review without applying it.`
- `Add this meeting note to the selected contact.`

Deleting an item requires the exact current item name as confirmation and uses ONE's existing soft-delete audit path.

## Update or remove

Update the public plugin marketplace and reinstall the current package:

```powershell
codex plugin marketplace upgrade geotech-one
codex plugin add one@geotech-one
```

Remove the plugin:

```powershell
codex plugin remove one@geotech-one
```

Remove a direct MCP connection:

```powershell
codex mcp logout one
codex mcp remove one
```

Removing the local connection does not change ONE user access. A ONE administrator can revoke server access immediately by disabling the account or removing its board grants.

## Security notes

- OAuth uses authorization code flow with PKCE, short-lived access tokens, and persistent rotating refresh tokens.
- The plugin never receives a Google password or a reusable Firebase credential.
- ONE enforces the signed-in person's live board viewer/editor grants on every tool call.
- The local stdio MCP remains available only in the private ONE application repository for specialized developer/API-key workflows.

Public installation guide: <https://geotech-crm.web.app/docs/codex-plugin/>
