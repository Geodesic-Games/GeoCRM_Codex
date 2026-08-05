---
name: one
description: Use when the user wants to inspect, search, create, update, move, comment on, or delete ONE board items, retrieve GeoTech brand standards, or prepare presentations, Complex Decisions, documents, diagrams, charts, product design, or other visual work through the ONE plugin. The remote MCP server signs in each person with OAuth and enforces that person's current permissions.
---

# ONE

Use the ONE app connector tools for ONE workspace and board work.

## Brand standards

- Before producing or substantially revising a presentation, Complex Decision brief, product or website design, UI, document, report, chart, diagram, campaign, email, social post, or other visual GeoTech work, call `get_brand_standards`.
- Treat the returned logos, colour values, typography, pattern, contrast, and clear-space rules as authoritative. Do not rely on remembered or copied values.
- Use only the ONE/Firebase-hosted asset URLs returned by the standard. Never substitute or expose Google Drive, Google Docs, or other third-party source links for brand files.
- Start from approved artwork or a published template. Never redraw, recolour, crop, stretch, distort, rotate, or rebuild the GeoTech mark or its lockups.
- Apply `Outfit` to brand/display headings and `IBM Plex Sans` to body text, UI, labels, annotations, and tables unless the returned standard explicitly supersedes that guidance.
- Review the finished composition at its actual delivery size before sharing or publishing it.

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
