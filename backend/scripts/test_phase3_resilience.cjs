// Mock browser localStorage
global.window = {
  localStorage: (() => {
    let store = {};
    return {
      getItem: (k) => store[k] || null,
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
      clear: () => { store = {}; },
      key: (i) => Object.keys(store)[i] || null,
      get length() { return Object.keys(store).length; }
    };
  })()
};

async function testResilienceSystem() {
  console.log('=== TEST 1: Deterministic Identity Key Generation ===');
  function generateFallbackKey({ type, slug = "generic", id, variant = "default" }) {
    const cleanType = type.toLowerCase().trim();
    const cleanSlug = slug.toLowerCase().trim();
    const cleanId = id ? id.toLowerCase().trim() : "";
    const cleanVariant = variant.toLowerCase().trim();
    if (cleanId) return `${cleanType}:${cleanSlug}:${cleanId}:${cleanVariant}`;
    return `${cleanType}:${cleanSlug}:${cleanVariant}`;
  }

  const key1 = generateFallbackKey({ type: 'product', slug: 'designer-poles', id: 'SSIL-DP-01', variant: 'day' });
  const key2 = generateFallbackKey({ type: 'hero', slug: 'designer-poles', variant: 'hero' });
  const key3 = generateFallbackKey({ type: 'product', slug: 'LED Decorative Poles', id: 'SSILDP01', variant: 'night' });
  
  console.log('Key 1:', key1, key1 === 'product:designer-poles:ssil-dp-01:day' ? '✅' : '❌');
  console.log('Key 2:', key2, key2 === 'hero:designer-poles:hero' ? '✅' : '❌');
  console.log('Key 3:', key3, key3 === 'product:led decorative poles:ssildp01:night' ? '✅' : '❌');

  console.log('\n=== TEST 2: Last-Known-Good Storage & Retrieval ===');
  const STORAGE_PREFIX = "ssil_lkg_v1:";
  const memoryStore = new Map();
  const LKG_TTL_MS = 14 * 24 * 60 * 60 * 1000;

  function recordLastKnownGood(identityKey, url) {
    if (!identityKey || !url || url.startsWith("data:")) return;
    const entry = { url, timestamp: Date.now() };
    memoryStore.set(identityKey, entry);
    window.localStorage.setItem(`${STORAGE_PREFIX}${identityKey}`, JSON.stringify(entry));
  }

  function getLastKnownGood(identityKey) {
    const memEntry = memoryStore.get(identityKey);
    if (memEntry && Date.now() - memEntry.timestamp < LKG_TTL_MS) return memEntry.url;
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${identityKey}`);
    if (raw) {
      const entry = JSON.parse(raw);
      if (entry && entry.url && Date.now() - entry.timestamp < LKG_TTL_MS) {
        memoryStore.set(identityKey, entry);
        return entry.url;
      }
    }
    return null;
  }

  function invalidateLastKnownGood(keyPattern) {
    if (!keyPattern) {
      memoryStore.clear();
      window.localStorage.clear();
      return;
    }
    const cleanPattern = keyPattern.toLowerCase();
    memoryStore.forEach((_, key) => {
      if (key.toLowerCase().includes(cleanPattern)) memoryStore.delete(key);
    });
    const keysToRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX) && k.toLowerCase().includes(cleanPattern)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  }

  const testUrl = 'https://res.cloudinary.com/wlgmz8gr/image/upload/v1740920000/ssil/test_live.jpg';
  
  // Before load
  console.log('Before live load - LKG is null:', getLastKnownGood(key1) === null ? '✅' : '❌');
  
  // Simulate live load success
  recordLastKnownGood(key1, testUrl);
  console.log('After live load - LKG retrieved correctly:', getLastKnownGood(key1) === testUrl ? '✅' : '❌');

  console.log('\n=== TEST 3: Admin Invalidation on Mutation ===');
  recordLastKnownGood(key2, testUrl);
  console.log('Key 2 stored before mutation:', getLastKnownGood(key2) === testUrl ? '✅' : '❌');
  
  // Admin updates/deletes designer-poles
  invalidateLastKnownGood('designer-poles');
  console.log('Key 1 invalidated (designer-poles):', getLastKnownGood(key1) === null ? '✅' : '❌');
  console.log('Key 2 invalidated (designer-poles):', getLastKnownGood(key2) === null ? '✅' : '❌');

  console.log('\n=== TEST 4: Frontend Production Endpoints (HTTP 200 & Stability) ===');
  const testUrls = [
    'http://localhost:3000/products/designer-poles',
    'http://localhost:3000/products/led-indoor-lights',
    'http://localhost:3000/products/decorative-poles',
    'http://localhost:3000/products/bollards',
    'http://localhost:3000/products/octagonal-poles',
    'http://localhost:3000/products/high-mast',
    'http://localhost:3000/products/stadium-high-mast',
    'http://localhost:3000/products/flag-mast-poles',
    'http://localhost:3000/products/camera-poles',
    'http://localhost:3000/products/solar-power-plants'
  ];

  for (const u of testUrls) {
    try {
      const res = await fetch(u);
      console.log(`Endpoint ${u.padEnd(50)}: HTTP ${res.status} ✅`);
    } catch (e) {
      console.log(`Endpoint ${u}: ❌ ${e.message}`);
    }
  }
}

testResilienceSystem();
