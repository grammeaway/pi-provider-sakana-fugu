# pi-provider-sakana-fugu

Disclaimer: Extension written fully by Pi itself.

Adds [Sakana Fugu](https://sakana.ai/fugu/) (`fugu`, `fugu-ultra`) to the
[pi](https://www.npmjs.com/package/@earendil-works/pi-coding-agent) coding agent.

Fugu exposes an OpenAI-compatible API, so this points pi's built-in
`openai-responses` streamer at `https://api.sakana.ai/v1` (the Responses API
is Sakana's recommended path for tooling/agents; Chat Completions also works).

## Install

```sh
# global extension
git clone <this> ~/.pi/agent/extensions/sakana-fugu
# or, once published:
npm i -g pi-provider-sakana-fugu   # then reference via -e / extensions dir
```

Or load directly for a quick try:

```sh
pi -e ./index.ts
```

## Login

Run `/login`, choose **Use an API key**, then **Sakana Fugu**, and paste the
key from [console.sakana.ai](https://console.sakana.ai). Fugu has no OAuth
flow — the same API key covers both the subscription and pay-as-you-go plans.
The key is stored in `~/.pi/agent/auth.json`. Alternatively set `SAKANA_API_KEY`
in your environment.

## Notes

- **Reasoning effort:** Fugu only accepts `high` and `xhigh` (`max`); any other
  value is rejected by the API. Lower levels are hidden, so set the model to
  **high** or **xhigh** — `medium`/`low` are not available.
- **Context window:** 1M tokens. Pricing has a higher tier above 272K tokens.
- **Costs** reflect the published `fugu-ultra-20260615` rates; plain `fugu` uses
  a blended, unpublished rate, so the same numbers are used as an upper bound.
- **Long turns:** complex `fugu-ultra` requests can run for minutes. If you see
  dropped streams on long turns, that's a client idle-timeout, not an extension
  bug (Sakana's own Codex config raises the stream idle timeout to 2h).
- EU/EEA access is currently unavailable per Sakana's terms.
