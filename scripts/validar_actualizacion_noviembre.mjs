import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
const selected = ['gastronomia', 'pasteleria', 'bar-profesional'];
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
assert.equal(urls.length, 11, 'El sitemap debe incluir 11 páginas reales');
assert.equal(new Set(urls.map(url => url.href)).size, urls.length);
for (const url of urls) {
  const path = url.pathname === '/' ? 'dist/index.html' : join('dist',url.pathname,'index.html');
  const html = await readFile(path,'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length,1, `${url.pathname}: debe haber un H1`);
  assert.ok(html.includes('rel="canonical" href="'+url.href+'"'), `${url.pathname}: canonical`);
  assert.ok(html.includes('name="description"'), `${url.pathname}: descripción`);
  assert.ok(!html.includes('<div id="app"></div>'), `${url.pathname}: contenido inicial vacío`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    if (/\.(?:jpg|jpeg|png|webp|svg|gif|pdf|css|js|mp3|woff2?)$/i.test(match[1])) await access(join('dist',match[1]));
  }
  if (url.pathname.startsWith('/programas/')) {
    for (const shift of ['morning','afternoon','night','weekend']) assert.ok(html.includes(`data-schedule-id="${shift}"`), `${url.pathname}: falta consulta ${shift}`);
    const slug = url.pathname.split('/').pop();
    if (selected.includes(slug)) {
      assert.ok(html.includes('16 de noviembre de 2026'), `${slug}: fecha`);
      assert.ok(html.includes('"startDate":"2026-11-16"'), `${slug}: fecha estructurada`);
    } else assert.ok(!html.includes('"startDate":"2026-11-16"'), `${slug}: fecha de otra convocatoria`);
  }
}
const notFound = await readFile('dist/404.html','utf8');
assert.ok(notFound.includes('noindex, follow'));
assert.ok((await readdir('dist/assets')).length > 0);
console.log('Validación correcta: 11 páginas, enlaces a archivos, metadatos, fecha y consultas en todos los turnos.');
