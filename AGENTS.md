# Tueeyo — Project Context for AI Agents

## Primary Reference
Read `docs/tueeyo-master-reference.md` first. It contains the full project context
including architecture, database schema, business model, tier structure, user journeys,
go-to-market strategy, and financial projections.

## Other docs (in /docs)
More detailed versions of specific areas if you need to go deeper:
- `tueeyo-business-plan-v2_1.md`
- `tueeyo-platform-spec-v2_1.md`
- `tueeyo-database-schema-v2_1.md`
- `tueeyo-project-plan-v2_1.md`
- `tueeyo-user-journey-paths.md`
- `tueeyo-revised-market-financials.md`

## Key Conventions
- Monetary amounts in pence (integers), never pounds
- Tier limits data-driven via `tier_limits` table, not hardcoded
- UUID primary keys throughout
- Soft deletes on users and events (`deleted_at` timestamp)
- `connection_type` = 'connected_with' (display label configurable per activity type)
- Always reference schema before creating or modifying tables

## About the Developer
Solo founder, non-technical. Building with AI assistance. Assume no prior knowledge.

**Always:**
- Give instructions one step at a time and wait for confirmation before the next
- Explain what each command does, not just what to run
- Include instructions for saving files (which editor, how to save, how to exit)
- Remind when changes should be committed to Git, with the exact commands to run
- Remind when code should be pushed to GitHub, with the exact commands
- Warn clearly before anything destructive or irreversible
- Use plain language — no jargon without explanation
- Prefer short back-and-forth over long explanations
- Point out if a task would be better handled by a different or more capable model

**Never:**
- Assume a step has been completed unless confirmed
- Give multiple steps at once
- Assume familiarity with the terminal, Git, or any tooling
- Skip "obvious" steps — nothing is obvious here

## Things the developer may not think to ask about
- Whether a dependency needs installing before code will run
- Whether environment variables need setting
- Whether a database migration needs running after schema changes
- Whether the dev server needs restarting after config changes
- Whether something needs to be added to .gitignore
- Whether a file or API key should be kept private

## Current Status
- Phase: 0 — Prototype Test
- Week: 1
- Last updated: 2026-05-25

[Paste session summary here as work progresses]

## Session Tracking
At the end of every session:
1. Summarise what was completed in this session
2. Note what the next step is
3. Remind the developer to update this file with the summary
4. Provide the summary in a format that can be directly pasted into this section
