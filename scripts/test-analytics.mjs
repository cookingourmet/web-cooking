import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

// Compile the real module and exercise it without a browser or network requests.
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'cg-analytics-'));
await build({ configFile: false, logLevel: 'error', build: {
  ssr: 'src/utils/analytics.ts', outDir: out, minify: false,
  rollupOptions: { output: { entryFileNames: 'analytics.mjs' } }
} });
const listeners = [];
const storage = new Map();
globalThis.window = {
  location: new URL('http://localhost:5173/'), dataLayer: [],
  sessionStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) }
};
globalThis.document = { title: 'Cooking Gourmet', addEventListener: (...args) => listeners.push(args),
  getElementById: () => null, createElement: () => { throw new Error('Local must not load GTM'); } };
globalThis.Element = class {};
const analytics = await import(pathToFileURL(path.join(out, 'analytics.mjs')));
analytics.initAnalytics();
analytics.initAnalytics();
assert.equal(listeners.length, 1, 'Single click listener');
assert.equal(listeners[0][2].capture, true, 'Track before SPA navigation');
analytics.trackEvent('click_whatsapp', { workshop_id: 'petit-four', cta_location: 'hero_workshops', phone: '999123456', message: 'private', program_id: 'invalid@example.com' });
let last = window.dataLayer.at(-1);
assert.equal(last.workshop_id, 'petit-four');
assert.equal(last.program_id, null);
assert(!('phone' in last) && !('message' in last));
analytics.trackEvent('click_whatsapp');
assert.equal(window.dataLayer.at(-1).workshop_id, null, 'Do not inherit prior workshop');
window.location = new URL('http://localhost:5173/programas/barismo?phone=999123456');
analytics.trackPageView('https://example.org/private?email=test@example.org');
assert.equal(window.dataLayer.at(-1).event, 'view_program');
assert.equal(window.dataLayer.at(-1).program_id, 'barismo');
assert.equal(window.dataLayer.at(-2).page_referrer, 'https://example.org');
assert(!window.dataLayer.at(-1).page_location.includes('?'));
window.location = new URL('http://localhost:5173/');
class Anchor extends Element {
  dataset = { workshopId: 'cocina-peruana', ctaLocation: 'hero_workshops' };
  href = 'https://wa.me/51981377382?text=private';
  classList = { contains: () => false };
  closest(selector) {
    if (selector === 'a[href]' || selector === '[data-cta-location]' || selector.includes('[data-workshop-id]')) return this;
    return null;
  }
}
const before = window.dataLayer.length;
listeners[0][1]({ target: new Anchor() });
assert.equal(window.dataLayer.length, before + 1, 'One WhatsApp event per click');
assert.equal(window.dataLayer.at(-1).workshop_id, 'cocina-peruana');
assert.equal(window.dataLayer.at(-1).cta_location, 'hero_workshops');
for (const id of ['gastronomia', 'pasteleria', 'bar-profesional', 'barismo', 'sommelier', 'cocina-acelerada']) {
  analytics.trackEvent('select_program', { program_id: id });
  assert.equal(window.dataLayer.at(-1).program_id, id);
}
console.log('PASS: local sin GTM, contexto, 6 programas, taller, privacidad de campos y clic único.');
