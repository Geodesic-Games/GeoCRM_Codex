---
name: one
description: Use when the user wants to inspect, search, create, update, move, comment on, or delete ONE board items through the ONE plugin. The remote MCP server signs in each person with OAuth and enforces that person's current board-level viewer or editor permissions.
---

# ONE

Use the `one` MCP tools for ONE workspace and board work.

## Start with access context

- Call `get_current_user` or `list_boards` when the target board or the user's access level is not already known.
- Treat the returned board list and access level as authoritative. Never infer permission from the prompt or from earlier tasks.
- A `viewer` board is read-only. Do not retry a denied write using another route or credential.

## Read workflow

1. Use `list_boards` to resolve the board ID.
2. Use `get_board` when column or group IDs matter.
3. Use `search_items` for discovery across permitted boards, or `list_board_items` for one board.
4. Use `get_item` before changing an existing record.

## Write workflow

- Confirm the board and target item before a mutation.
- Prefer exact existing column IDs or titles from `get_board`.
- Preview moves with `dry_run: true` before applying them.
- For deletion, read the item first and pass its exact current name as `confirm_name`.
- Report permission errors as access-policy outcomes. Ask a ONE administrator to change the person's group only when broader access is genuinely required.

## Security

- Never request, display, store, or paste an API key for the remote plugin.
- OAuth tokens are managed by Codex and ONE. Do not place them in prompts, source files, logs, or board fields.
- A disabled ONE user or removed board grant takes effect on the next tool call, including calls made with an existing token.
