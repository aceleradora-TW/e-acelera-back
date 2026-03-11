import { redis } from "../lib/redis.js";
import { CACHE_TTL, IS_CACHE_ENABLED } from "../utils/constants.js";
import { safeJsonParse } from "../utils/safe-json.js";

function parseCachedValue<T>(cached: unknown): T | null {
	if (!cached) {
		return null;
	}

	if (typeof cached === "object") {
		return cached as T;
	}

	if (typeof cached !== "string") {
		return null;
	}

	const parsed = safeJsonParse<T>(cached);

	if (parsed === null) {
		console.warn("Ignoring malformed cache entry");
	}

	return parsed;
}

export async function cacheOrFetch<T>(
	key: string,
	fetchFunction: () => Promise<T>,
) {
	try {
		if (!IS_CACHE_ENABLED) {
			return await fetchFunction();
		}

		const cached: unknown = await redis!.get(key);
		const parsedCache = parseCachedValue<T>(cached);

		if (parsedCache !== null) {
			return parsedCache;
		}

		const data = await fetchFunction();
		await redis!.set(key, JSON.stringify(data), { ex: CACHE_TTL });
		return data;
	} catch (error) {
		console.error(`Error fetching data for key ${key}:`, error);
		throw error;
	}
}
