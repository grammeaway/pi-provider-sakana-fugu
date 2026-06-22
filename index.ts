/**
 * Sakana Fugu provider for pi.
 *
 * Fugu is an OpenAI-compatible API, so this points pi's built-in
 * openai-responses streamer at https://api.sakana.ai/v1. Sakana recommends
 * the Responses API for tooling/agents (Chat Completions also works).
 *
 * Auth: Fugu has no OAuth flow — it authenticates with an API key issued from
 * https://console.sakana.ai (the same key covers both the subscription and
 * pay-as-you-go billing plans). So it registers as an API-key provider:
 * `/login` lists it under the API-key option, and SAKANA_API_KEY also works.
 *
 * Usage:
 *   pi -e ./index.ts        # then /login -> API key -> Sakana Fugu
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const BASE_URL = "https://api.sakana.ai/v1";

// Fugu only accepts reasoning effort "high" or "xhigh"/"max"; any other value
// is rejected. Map pi's levels so it can never send an invalid one: lower
// levels are hidden (null), high/xhigh pass through.
const THINKING: Record<string, string | null> = {
	off: null,
	minimal: null,
	low: null,
	medium: null,
	high: "high",
	xhigh: "xhigh",
};

// ponytail: costs are the published fugu-ultra-20260615 rates (per 1M tokens,
// <=272K context). Fugu's price is a blended rate that varies with the active
// agent pool and isn't published, so it reuses Ultra's numbers as an upper
// bound. Edit cost{} if Sakana publishes exact Fugu pricing.
const MODELS = [
	{
		id: "fugu",
		name: "Fugu",
		reasoning: true,
		thinkingLevelMap: THINKING,
		input: ["text", "image"] as ("text" | "image")[],
		cost: { input: 5, output: 30, cacheRead: 0.5, cacheWrite: 0 },
		contextWindow: 1000000,
		maxTokens: 128000,
	},
	{
		id: "fugu-ultra",
		name: "Fugu Ultra",
		reasoning: true,
		thinkingLevelMap: THINKING,
		input: ["text", "image"] as ("text" | "image")[],
		cost: { input: 5, output: 30, cacheRead: 0.5, cacheWrite: 0 },
		contextWindow: 1000000,
		maxTokens: 128000,
	},
];

export default function (pi: ExtensionAPI) {
	pi.registerProvider("sakana-fugu", {
		name: "Sakana Fugu",
		baseUrl: BASE_URL,
		apiKey: "$SAKANA_API_KEY",
		api: "openai-responses",
		models: MODELS,
	});
}
