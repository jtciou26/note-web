# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with nodemon (src/index.js)
npm run final     # Run the completed reference implementation (final/index.js)
npm run seed      # Seed DB with 10 users + 25 notes (password: "password")
npm run lint      # ESLint src/**/*.js
```

No test suite is configured.

## Environment Setup

Copy `.env.example` to `.env` and fill in:
- `DB_HOST` — MongoDB connection URL
- `JWT_SECRET` — secret for signing JWTs
- `GOOGLE_CLOUD_PROJECT_ID` — for Pub/Sub event logging (optional)
- `GOOGLE_APPLICATION_CREDENTIALS` or `GOOGLE_APPLICATION_CREDENTIALS_JSON` — GCP auth (optional)

For local GCP auth: `gcloud auth application-default login`

## Architecture

GraphQL API built with Apollo Server + Express, backed by MongoDB/Mongoose.

**Entry point:** `src/index.js` — configures Express middleware (helmet, CORS), JWT extraction, Apollo Server with depth limit (5) and complexity limit (1000), and a `/metadata` proxy endpoint.

**GraphQL layer:**
- `src/schema.js` — type definitions (Note, User, NoteFeed)
- `src/resolvers/` — split by concern: `query.js`, `mutation.js`, `note.js`, `user.js`

**Data layer:**
- `src/models/` — Mongoose models for Note and User
- `src/db.js` — MongoDB connection helper

**Auth:** JWT passed as raw `Authorization` header (no "Bearer" prefix). Decoded in `getUser()` in `index.js` and passed as `user` in Apollo context.

**Note soft-delete:** `deleteNote` sets `isRemoved: true` instead of removing the document.

**Event logging pipeline (`src/util/eventLogger.js`):**  
Mutations (newNote, updateNote, deleteNote) publish structured events to a Google Cloud Pub/Sub topic `event_logs`. A Cloud Function (`pubsub-to-bigquery-function/`) subscribes and inserts into BigQuery `logs.events`. Logging failures are caught and do not fail the mutation.

**`/final` directory:** Complete reference implementation — safe to consult but not the active development target (`/src` is).
