import { ENVIRONMENT } from "../utils/env-parser.js"
import { situationalDebug } from "../utils/lib.js"

/**
 * @typedef {Object} CacheEntry
 * @property {import("./viacep.js").ViacepResponseData | null} value
 * @property {number} expiresAt
 */

/** @type {Map<string, CacheEntry>} */
const CACHE = new Map()
const DEFAULT_TTL = 10 * 60 * 1000 // 10 minutes
const CLEAR_EXPIRED_DELAY = 60 * 1000 // 1 minute

if (ENVIRONMENT !== 'test')
    setInterval(clearExpiredEntries, CLEAR_EXPIRED_DELAY)

function clearExpiredEntries () {
    const now = Date.now()
    for (const [key, entry] of CACHE.entries())
        if (entry.expiresAt < now) CACHE.delete(key)

    situationalDebug('Cleared cache. State:', CACHE)
}

/**
 * Also accepts null for when the Postcode is valid but doesn't exist
 * @param {string} key
 * @param {CacheEntry['value']} value
 * @param {number} [ttlMs=DEFAULT_TTL]
 */
export function setCache (key, value, ttlMs = DEFAULT_TTL) {
    CACHE.set(key, { value, expiresAt: Date.now() + ttlMs })
    situationalDebug(`Updated cache for ${key}. State:`, CACHE)
}

/**
 * @param {string} key
 * @returns {CacheEntry['value'] | false}
 */
export function getCache (key) {
    const entry = CACHE.get(key)

    if (!entry) return false
    if (entry.expiresAt < Date.now()) {
        CACHE.delete(key)
        return false
    }

    situationalDebug(`Fetched cache for ${key}. State:`, CACHE)
    return entry.value
}
