import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { routePage, renderSeoHead, PAGE_PATHS } from '../.prerender/prerender.js';
const template = await readFile('dist/index.html', 'utf8');
for (const path of [...PAGE_PATHS, '/404']) {
  const destination = path === '/' ? 'dist/index.html' : path === '/404' ? 'dist/404.html' : join('dist', path.slice(1), 'index.html');
  const { html } = routePage(path);
  const output = template.replace(/<title>[\s\S]*?<\/title>/, renderSeoHead(path)).replace('<div id="app"></div>', () => `<div id="app">${html}</div>`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, output);
}
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<','&lt;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGE_PATHS.map(path => `  <url><loc>${escape('https://www.cookingourmet.edu.pe'+path)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml',sitemap);
await rm('.prerender', {recursive:true,force:true});
console.log(`Prerendered ${PAGE_PATHS.length} pages and a 404 page.`);
