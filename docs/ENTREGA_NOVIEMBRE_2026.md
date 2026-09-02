# Cooking Gourmet · Inicio 16 de noviembre de 2026

## Qué incluye esta versión

- Gastronomía Profesional, Pastelería y Bar Profesional anuncian el 16 de noviembre de 2026, tanto en sus páginas como en Cookito.
- Se conservan precios, duración, temario, requisitos, sedes y horarios publicados. Los otros tres programas conservan sus fechas originales.
- Cada horario publicado abre una consulta de WhatsApp con el programa, la hora y la convocatoria. También se puede consultar por mañana, tarde, noche y fin de semana. Las horas nuevas y vacantes las confirma admisión; no se inventaron horarios.
- Portada más sencilla, tres programas destacados, catálogo visible sin carrusel, tipografía y superficies más limpias. Las fichas muestran la fecha y los horarios antes del contenido extenso.
- Los enlaces a brochures inexistentes pasan a “Solicitar brochure” por WhatsApp. Cuando se añada el PDF a la ruta indicada en los datos, el siguiente build habilita su descarga.
- Páginas HTML completas, metadatos propios, enlaces canónicos y datos estructurados por programa; sitemap con 11 páginas reales y página 404.
- Conservación de campañas UTM durante la sesión y eventos de consulta por programa/turno. Los formularios solo confirman éxito cuando el servicio devuelve `success: true`.

## Instalar en tu proyecto

Esta entrega es el proyecto completo, sin `node_modules` ni archivos de compilación. Conserva una copia de tu proyecto actual antes de reemplazarlo.

1. Extrae el ZIP en una carpeta nueva.
2. Abre una terminal en `web-cooking-noviembre-2026`.
3. Ejecuta `npm ci` y después `npm run build`.
4. La carpeta `dist` contiene el sitio listo para alojar. Si usas Vercel, conserva `vercel.json`, usa el comando `npm run build` y el directorio de salida `dist`.
5. Comprueba el dominio antes de enviar tráfico de campaña. La entrega no reemplaza automáticamente el sitio en tu dominio.

La fecha se cambia en `src/data/admission.data.ts`. Para modificar información académica, usa `src/data/programs.data.ts` y su equivalente de Cookito `src/components/hero/heroAssistantData.ts`.

## Google Tag Manager y GA4: configuración pendiente en la cuenta

El sitio conserva el contenedor `GTM-T8T5TV37`. Solo lo carga en `www.cookingourmet.edu.pe` o `cookingourmet.edu.pe`; la revisión privada no envía tráfico a la propiedad. No se accedió ni se modificó tu cuenta de GTM o GA4.

Crea variables de capa de datos, versión 2, con estos nombres: `page_location`, `page_title`, `page_referrer`, `page_path`, `program_id`, `cohort_id`, `schedule_id`, `cta_location`, `form_id`, `lead_method`, `error_code`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.

| Evento de capa de datos | Evento en GA4 | Qué significa |
|---|---|---|
| `cg_page_view` | `page_view` | Página inicial o cambio de ruta |
| `view_program` | `view_program` | Ficha de un programa |
| `click_whatsapp` | `click_whatsapp` | Apertura de WhatsApp; no confirma conversación ni venta |
| `click_phone`, `click_email`, `click_map` | Mismo nombre | Acción de contacto |
| `brochure_download` | `brochure_download` | Clic en PDF disponible |
| `lead_submit` | `lead_submit` | Intento de envío al servicio |
| `generate_lead` | `generate_lead` | Servicio de formularios confirmó la recepción |
| `lead_error` | `lead_error` | Fallo de entrega, con código sin datos personales |

Para cada evento, usa un activador de evento personalizado con el nombre exacto y una etiqueta GA4 conectada al ID de medición real de tu propiedad. Transfiere las variables pertinentes como parámetros. En `page_view`, incluye ubicación, título y referente; la ubicación excluye consultas arbitrarias para evitar enviar datos personales. Transfiere las UTM validadas como `campaign_source`, `campaign_medium`, `campaign_name`, `campaign_content`, `campaign_term` para la atribución de campaña.

Para usar estas vistas manuales, desactiva la vista automática inicial (`send_page_view: false`) y la medición de páginas basada en cambios de historial. Retira activadores anteriores que cuenten las mismas vistas. Mantén las demás mediciones que sí necesites. Google explica el [control de vistas manuales](https://developers.google.com/analytics/devguides/collection/ga4/views) y la [medición de aplicaciones de una sola página](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications).

Marca `generate_lead` como evento clave. Trata `click_whatsapp` como una consulta potencial; una venta necesita confirmación de matrícula/pago desde tu proceso comercial. No se incorporó un evento `purchase` ficticio.

En GTM Preview/Tag Assistant y GA4 DebugView, verifica una sola vista por página, un clic por contacto, programa/turno correcto y que los fallos no generen leads. Las pruebas de código incluidas no sustituyen esta comprobación en tu cuenta. La [documentación de la capa de datos](https://developers.google.com/tag-platform/tag-manager/datalayer) explica los activadores y parámetros.

No envíes nombres, celulares, correos, DNI ni conversaciones a GA4. Los datos de contacto siguen enviándose únicamente al servicio de solicitudes configurado en el proyecto. Revisa las etiquetas ya existentes: esta actualización no puede controlar etiquetas desconocidas dentro del contenedor.

## SEO y seguimiento comercial

Envía `https://www.cookingourmet.edu.pe/sitemap.xml` en Search Console tras publicar en el dominio. Inspecciona las tres páginas de campaña y solicita indexación si corresponde. La generación de HTML y los datos estructurados facilitan la lectura; no garantizan posiciones ni resultados enriquecidos.

Usa nombres consistentes de campaña, por ejemplo `utm_source=facebook&utm_medium=paid_social&utm_campaign=inicio_noviembre_2026&utm_content=gastronomia_video_01`. El código admite valores de hasta 100 caracteres con letras ASCII, números, espacios, guiones y guiones bajos; usa etiquetas sin datos personales.

Cada semana compara consultas por programa y origen, contactos atendidos, matrículas confirmadas y gasto por matrícula. Los datos de matrícula/pago deben venir del registro comercial; el sitio solo conoce vistas, clics y solicitudes.

## Verificación realizada y límites

El build valida 11 páginas, contenido HTML inicial, metadatos, archivos enlazados, los cuatro turnos de consulta y la fecha estructurada de los tres programas. Se comprobaron además los datos académicos contra el archivo original, la conservación de UTM y el rechazo de respuestas de formularios sin confirmación de éxito. No se enviaron solicitudes reales ni se midieron resultados comerciales. No se realizó una prueba visual en navegador ni se accedió a Analytics.
