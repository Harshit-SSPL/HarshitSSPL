/**
 * SSIL Last-Known-Good (LKG) Resilience Store
 * 
 * Stores successfully loaded Cloudinary asset references on the client.
 * If temporary network failure, slow connectivity, or CDN outage occurs,
 * the application can retrieve the Last-Known-Good asset reference
 * instead of collapsing into a blank or broken state.
 * 
 * Admin mutations automatically invalidate relevant keys to prevent
 * deleted/modified items from displaying stale assets indefinitely.
 */

const STORAGE_PREFIX = "ssil_lkg_v1:";
const memoryStore = new Map<string, { url: string; timestamp: number }>();
const MAX_LKG_ITEMS = 300;
const LKG_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

/**
 * Checks if running in a browser environment with localStorage support.
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__ssil_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Records a successfully loaded live image URL as the Last-Known-Good asset.
 * Only records valid HTTP/HTTPS URLs (never data URLs or placeholders).
 */
export function recordLastKnownGood(identityKey: string, url: string): void {
  if (!identityKey || !url) return;
  if (url.startsWith("data:") || url.includes("<svg")) return;

  const entry = { url, timestamp: Date.now() };
  memoryStore.set(identityKey, entry);

  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${identityKey}`, JSON.stringify(entry));
    } catch (e) {
      // Storage quota exceeded or disabled in private browsing - graceful fallback to memory
    }
  }
}

/**
 * Retrieves the Last-Known-Good image URL for a given content identity key.
 */
export function getLastKnownGood(identityKey: string): string | null {
  if (!identityKey) return null;

  // 1. Check in-memory store
  const memEntry = memoryStore.get(identityKey);
  if (memEntry && Date.now() - memEntry.timestamp < LKG_TTL_MS) {
    return memEntry.url;
  }

  // 2. Check localStorage
  if (isLocalStorageAvailable()) {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${identityKey}`);
      if (raw) {
        const entry = JSON.parse(raw);
        if (entry && entry.url && Date.now() - entry.timestamp < LKG_TTL_MS) {
          memoryStore.set(identityKey, entry);
          return entry.url;
        }
      }
    } catch (e) {
      // JSON parse error or localStorage read error
    }
  }

  return null;
}

/**
 * Invalidates Last-Known-Good entries.
 * When an Admin updates or deletes a product/design, calling this function
 * ensures deleted images are never permanently shown from stale client cache.
 * 
 * @param keyPattern Optional prefix pattern (e.g. "product:designer-poles" or "design:").
 *                   If omitted, clears all entries.
 */
export function invalidateLastKnownGood(keyPattern?: string): void {
  if (!keyPattern) {
    memoryStore.clear();
    if (isLocalStorageAvailable()) {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => window.localStorage.removeItem(k));
      } catch (e) {}
    }
    return;
  }

  // Targeted pattern invalidation
  const cleanPattern = keyPattern.toLowerCase();
  memoryStore.forEach((_, key) => {
    if (key.toLowerCase().includes(cleanPattern)) {
      memoryStore.delete(key);
    }
  });

  if (isLocalStorageAvailable()) {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX) && key.toLowerCase().includes(cleanPattern)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    } catch (e) {}
  }
}
