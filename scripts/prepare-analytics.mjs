import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = process.argv[2];
if (!source) throw new Error('Indica la ruta del JSON original de GTM.');
const exportData = JSON.parse(fs.readFileSync(source, 'utf8'));
const container = exportData.containerVersion;
assert.equal(container.container.publicId, 'GTM-T8T5TV37');
const events = ['select_program', 'select_workshop', 'view_workshop', 'hero_slide_select',
  'assistant_open', 'assistant_select_program', 'click_virtual_classroom', 'workshop_price_view'];
const templateTag = container.tag.find(tag => tag.name === 'GA4 - view_program');
const templateTrigger = container.trigger.find(trigger => trigger.triggerId === templateTag.firingTriggerId[0]);
let nextId = Math.max(...['tag', 'trigger', 'variable'].flatMap(type =>
  container[type].map(item => Number(item[`${type}Id`])))) + 1;
for (const event of events) {
  assert(!container.tag.some(tag => tag.name === `GA4 - ${event}`), `Evento duplicado: ${event}`);
  const trigger = structuredClone(templateTrigger);
  trigger.triggerId = String(nextId++);
  trigger.name = `CG - Evento - ${event}`;
  delete trigger.fingerprint;
  trigger.customEventFilter[0].parameter.find(p => p.key === 'arg1').value = event;
  const tag = structuredClone(templateTag);
  tag.tagId = String(nextId++);
  tag.name = `GA4 - ${event}`;
  tag.notes = 'Analytics v6.3: evento explícito; conserva las dimensiones existentes. No contiene texto del usuario.';
  tag.firingTriggerId = [trigger.triggerId];
  delete tag.fingerprint;
  tag.parameter.find(p => p.key === 'eventName').value = event;
  container.trigger.push(trigger);
  container.tag.push(tag);
}
// null means explicitly cleared; only legacy events without a value use route fallback.
const program = container.variable.find(v => v.name === 'CG - Programa');
program.parameter.find(p => p.key === 'javascript').value = `function() {
  var value = {{CG - DL - program_id}};
  if (typeof value === 'undefined') {
    var path = {{CG - Ruta de pagina}};
    value = path.indexOf('/programas/') === 0 ? path.slice(11) : undefined;
  }
  if (value === 'cocina') value = 'cocina-acelerada';
  var programs = ['gastronomia','pasteleria','bar-profesional','barismo','sommelier','cocina-acelerada'];
  return programs.indexOf(value) >= 0 ? value : undefined;
}`;
const workshop = container.variable.find(v => v.name === 'CG - Dato - workshop_id');
workshop.parameter.find(p => p.key === 'javascript').value = `function() {
  var value = {{CG - DL - workshop_id}};
  var workshops = ['pescados-y-mariscos','cocina-peruana','fast-food','limonadas-y-triples','pasteleria-boutique'];
  return workshops.indexOf(value) >= 0 ? value : undefined;
}`;
// Validate references and preserve the existing WhatsApp conversion name.
const names = new Set(container.variable.map(v => v.name).concat('_event'));
for (const name of JSON.stringify(container).matchAll(/\{\{([^}]+)\}\}/g)) {
  assert(names.has(name[1]), `Variable no resuelta: ${name[1]}`);
}
for (const tag of container.tag) {
  for (const id of tag.firingTriggerId ?? []) assert(id === '2147479573' || container.trigger.some(t => t.triggerId === id));
  for (const setup of tag.setupTag ?? []) assert(container.tag.some(t => t.name === setup.tagName));
}
assert.equal(container.tag.find(t => t.name === 'GA4 - contact_whatsapp').parameter.find(p => p.key === 'eventName').value, 'contact_whatsapp');
fs.mkdirSync('analytics', { recursive: true });
fs.writeFileSync('analytics/GTM-T8T5TV37_v6.3.json', JSON.stringify(exportData, null, 2) + '\n');
console.log(`GTM validado: ${container.tag.length} etiquetas, ${container.trigger.length} activadores, ${container.variable.length} variables.`);
