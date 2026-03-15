---
title: Building a Cost Observability Tool for My AI Agent
date: 2026-03-15
description: How I built a real-time dashboard to track LLM API costs across my Discord AI agent conversations.
---

<article class="blog-post">

## The Problem

I run an AI agent (OpenClaw) on Discord that helps me with coding, writing, and daily tasks. Every message triggers an LLM API call — and here's the thing: **I had no idea how much each conversation was costing me.**

Was that blog post draft I asked for worth $0.02 or $0.50? Which channel was eating through my API quota? Did something weird happen last Tuesday that blew up my bill?

The OpenClaw framework logs everything to JSONL files — rich data with token counts, costs, model info — but there's no dashboard to actually *see* it. So I built one.

---

## What I Built

A real-time cost observability dashboard that tracks:

1. **Token usage over time** — day/week/month graphs
2. **Cost by channel** — which Discord conversations are most expensive
3. **Spike detection** — alerts when a request uses 2x the normal amount
4. **Drill-down** — click any channel to see every query with its token count and cost

The whole thing runs locally with no external services. SQLite for storage, vanilla Node.js for the server, Chart.js for graphs.

---

## How It Works

### Data Collection

OpenClaw stores session data as append-only JSONL files. Each file contains a stream of events — session start, model changes, user messages, assistant responses with token usage.

The collector scans these files, tracking byte offsets so it only reads new data on each run:

```
{type: "message", role: "user", content: [...]}     ← capture query preview
{type: "message", role: "assistant", usage: {...}} ← extract tokens + cost
```

For each request, I store:
- Timestamp
- Channel ID (from filename pattern `*-topic-{channel_id}.jsonl`)
- Input/output/total tokens
- Cost in USD (already computed by OpenClaw)
- First 200 characters of the query (privacy + storage efficiency)

### Spike Detection

For each channel with at least 10 requests in the last 7 days:
- Calculate the average tokens per request
- Flag anything above 2× average as a spike

This catches things like: a massive code analysis request, a long document summarization, or a multi-tool reasoning chain that went wild.

### The Dashboard

Single HTML page with vanilla JavaScript. Chart.js for graphs. Dark theme (because obviously).

Click a channel in the sidebar → see every request. Toggle between day/week/month → graphs update. Simple.

---

## The Numbers

After running the collector on my existing session data:

- **679 requests** processed
- **13 Discord channels** tracked
- **$4.82 total** API cost since I started using OpenClaw

Most expensive channel? #cost-tool (ironically) at $1.42 — lots of back-and-forth on this very project.

The spike detection caught a few requests around 30K+ tokens — mostly complex coding tasks and multi-paragraph responses.

---

## Why No External Services?

I didn't want to set up cloud databases or API keys. The tool runs on the same machine as OpenClaw:
- **SQLite** — zero-config, synchronous, fast
- **Node.js http module** — no Express needed
- **Chart.js from CDN** — no build step

This means it works offline, starts instantly, and has no attack surface beyond the local network.

---

## What I Learned

1. **Append-only files are great for incremental processing** — just track byte offsets
2. **SQLite is underrated for local tools** — no setup, real queries, fast enough
3. **Spike detection doesn't need statistics** — a simple 2× threshold is interpretable and actionable
4. **Vanilla JS + CDN libs = minimal maintenance** — no build pipeline, no dependency hell

---

## What's Next

- Per-channel cost budget alerts (Discord notifications when a channel exceeds a daily limit)
- Model breakdown chart (Claude vs MiniMax cost split)
- Cache hit ratio tracking (how efficiently am I using the context cache?)
- Export to CSV

---

*Built with OpenClaw, SQLite, Chart.js, and too many Discord messages.*

</article>
