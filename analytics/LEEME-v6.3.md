# Cooking Gourmet — Analytics v6.3

Actualización para pruebas locales. No se ha publicado la web ni modificado tu cuenta de Google.
Se conserva el diseño, las rutas SEO y las 13 dimensiones personalizadas ya creadas.

## 1. Probar la web primero

1. Guarda una copia de tu proyecto actual. Extrae este ZIP en una carpeta nueva.
2. En esa carpeta, abre una terminal y ejecuta `npm ci` y después `npm run dev`.
3. Abre la dirección local que indica Vite.
4. Abre F12 > Consola. Tras hacer clic en un programa o en WhatsApp, consulta:

```js
console.table(window.dataLayer.filter(item => item.event));
```

En localhost NO se carga GTM ni se envían estos eventos a la propiedad de producción.
Por eso es normal no ver estas pruebas en DebugView. Crear dimensiones en GA4 no activa
por sí solo el envío de parámetros. No hace falta crear de nuevo tus 13 dimensiones.

### Pruebas manuales pendientes

| Acción | Evento local esperado | Datos que comprobar |
| --- | --- | --- |
| Abrir una página | cg_page_view | page_path, sin datos personales en la URL |
| Conocer un programa desde el carrusel o menú | select_program | program_id del destino; cta_location del origen |
| Entrar al detalle de un programa | view_program | program_id; incluye Barismo |
| Cambiar carrusel con flecha, pestaña, teclado o gesto | hero_slide_select | programa elegido, ubicación/control |
| Rotación automática del carrusel | Ningún evento de selección | No se cuenta como acción del visitante |
| WhatsApp de cada portada de taller | click_whatsapp | workshop_id correcto; hero_workshops |
| WhatsApp de una tarjeta de taller | click_whatsapp | workshop_id correcto; workshops |
| Abrir Cookito | assistant_open | form_id=cookito |
| Cambiar programa en Cookito | assistant_select_program | program_id, form_id=cookito |
| Abrir Aula Virtual | click_virtual_classroom | cta_location=header |
| Intentar enviar formulario válido | lead_submit | form_id, lead_method |
| Respuesta exitosa del servicio de formularios | generate_lead | Solo después de confirmar éxito |
| Error al enviar | lead_error | error_code; sin texto de la conversación |

Un clic en WhatsApp genera un solo `click_whatsapp` propio de la web; GTM lo convierte
en `contact_whatsapp`, conservando tu evento clave. Esto mide intención de contacto:
NO confirma que se envió el mensaje, se produjo una conversación ni una matrícula.
Abrir un enlace puede abrir WhatsApp; no hace falta enviar un mensaje durante la prueba.
No pruebes formularios reales con datos personales sin considerar que pueden llegar a ventas.

## 2. GTM: preparar sin publicar

Archivo: `analytics/GTM-T8T5TV37_v6.3.json`.
Mantiene el contenedor GTM-T8T5TV37, la medición G-6ZB1YVST9H y las etiquetas existentes.
Añade 8 etiquetas con sus activadores; total: 21 etiquetas, 19 activadores, 27 variables.

Antes de importar, exporta una copia ACTUAL de tu contenedor. Este archivo parte del
workspace4 que compartiste; no incorpora cambios posteriores realizados en Google.
Confirma en el flujo web de GA4 que G-6ZB1YVST9H corresponde a la propiedad deseada.

En GTM, ve a Administrar > Importar contenedor. Elige un espacio de trabajo de pruebas
y la opción de combinar, revisando los conflictos antes de confirmar. Las variables
`CG - Programa` y `CG - Dato - workshop_id` se actualizan; conserva sus nombres y evita
renombrarlas como duplicados. No uses sobrescribir todo el contenedor.
Si el resumen muestra cambios ajenos a esta actualización, cancela y revisa primero.
No pulses Enviar/Publicar todavía.

Este JSON conserva el nombre `contact_whatsapp`: no crees otro evento clave con el
nombre `click_whatsapp`. Los eventos de navegación y apertura de Cookito no son leads.

## 3. Antes de conectar producción

- Verificar las etiquetas en Vista previa de GTM y los parámetros recibidos en DebugView.
  Con la protección local actual esto necesita una prueba controlada posterior en un
  entorno habilitado para etiquetas; conectar Tag Assistant no elimina esa protección.
- Revisar la medición mejorada del flujo GA4. La web ya envía vistas explícitas tras
  navegar: evitar otra vista automática por cambios de historial.
- Revisar los clics salientes y formularios automáticos: pueden producir eventos `click`
  o `form_start` adicionales y capturar URLs/texto que no forman parte de este seguimiento.
  Evitar enviar URLs de WhatsApp con mensajes del visitante. Los eventos propios no
  incluyen link_url, nombre, teléfono, correo ni texto del chat.
- Revisar consentimiento y privacidad antes del lanzamiento; este paquete no cambia la
  plataforma de consentimiento ni certifica cumplimiento legal.
- Verificar una única vista por ruta, un contacto por clic y un generate_lead únicamente
  tras envío confirmado. Las 13 dimensiones deben mostrar los parámetros reales recibidos.
- Las dimensiones pueden tardar 24–48 horas en estar disponibles en informes después de
  recibir datos. No esperar informes de las pruebas locales sin transmisión.

## Archivos modificados

- src/utils/analytics.ts: contexto de clic antes de navegar, programas/talleres válidos,
  limpieza del contexto anterior, eventos de detalles y seguimiento centralizado.
- src/main.ts: elimina el segundo seguimiento de clics por atributos antiguos.
- src/components/hero/heroSlider.ts: IDs de los tres talleres, selección manual del
  carrusel y limpieza del temporizador al salir de la página.
- src/components/hero/heroAssistantPanel.ts: apertura/selección, programa en tarjetas y
  contexto de intento, éxito y error del formulario; sin enviar texto del chat a GA.
- src/pages/especializacion.ts: contexto del formulario en intento, éxito y error.
- analytics/GTM-T8T5TV37_v6.3.json: contenedor compatible para importar y revisar.
- scripts/test-analytics.mjs: pruebas aisladas con el módulo real, sin solicitudes de red.
- scripts/prepare-analytics.mjs: generador del JSON a partir del workspace4 original.

## Validación realizada y límites

Pasaron `node scripts/test-analytics.mjs` y la comprobación TypeScript (`tsc --noEmit`).
Se validaron referencias entre etiquetas, activadores y variables del JSON.
La ejecución de `npm run build` se interrumpió en este entorno y no se confirmó su
resultado completo. Ejecuta `npm run build` en tu equipo antes de subir la web.
No se han realizado pruebas de navegador, envíos reales, importación en Google ni
verificación de recepción en GA4. No se incluyen dependencias ni una carpeta dist lista
para publicar. Se conserva package-lock.json para instalar las mismas versiones.

## Referencias oficiales

- Data layer y envío explícito de eventos: https://developers.google.com/tag-platform/tag-manager/datalayer
- Dimensiones y tiempos de disponibilidad: https://support.google.com/analytics/answer/14240153?hl=es
