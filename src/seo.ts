import { ADMISSION, isAdmissionProgram } from "./data/admission.data";
import { programsData } from "./data/programs.data";
import { workshops } from "./data/workshops.data";

export const SITE_URL = "https://www.cookingourmet.edu.pe";
export const PAGE_PATHS = ["/", "/especializacion", ...Object.values(programsData).map(p => p.path!), ...workshops.map(w => `/talleres/${w.slug}`)];

function escape(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function pageMetadata(path: string) {
  const program = Object.values(programsData).find(p => p.path === path);
  const workshop = workshops.find(w => `/talleres/${w.slug}` === path);
  const known = PAGE_PATHS.includes(path);
  let title = "Escuela de Gastronomía en Huancayo | Cooking Gourmet";
  let description = `Gastronomía, Pastelería y Bar Profesional en Huancayo. Inicio ${ADMISSION.shortLabel} de 2026. Consulta horarios, inversión y requisitos.`;
  let image = "/images/seo/cooking-gourmet-portada.jpg";
  if (program) {
    title = program.seoTitle ?? `${program.title} en Huancayo | Cooking Gourmet`;
    description = program.seoDescription ?? program.description;
    if (isAdmissionProgram(program.slug)) description += ` Inicio ${ADMISSION.label}. Consulta todos los turnos con admisión.`;
    image = program.image;
  } else if (workshop) {
    title = `${workshop.shortTitle} en Huancayo | Cooking Gourmet`;
    description = workshop.seoDescription;
    image = workshop.image;
  } else if (path === "/especializacion") {
    title = "Curso de Inocuidad Alimentaria | Cooking Gourmet";
    description = "Programa virtual gratuito sobre inocuidad alimentaria, higiene, buenas prácticas de manipulación y saneamiento de Cooking Gourmet.";
    image = "/images/especializacion/chef-1.png";
  } else if (!known) {
    title = "Página no encontrada | Cooking Gourmet";
    description = "Encuentra nuestros programas y consulta con admisión de Cooking Gourmet en Huancayo.";
  }
  return { title, description, image, known, program, workshop };
}

export function renderSeoHead(path: string) {
  const meta = pageMetadata(path);
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  const image = `${SITE_URL}${meta.image}`;
  const org = {
    "@type": "EducationalOrganization", "@id": `${SITE_URL}/#organization`,
    name: "Cooking Gourmet", url: `${SITE_URL}/`, logo: `${SITE_URL}/logo.png`,
    telephone: "+51 981 377 382", address: { "@type": "PostalAddress", streetAddress: "Av. Ferrocarril 587", addressLocality: "Huancayo", addressRegion: "Junín", addressCountry: "PE" },
    sameAs: ["https://www.facebook.com/Cooking.Gourmet", "https://www.instagram.com/cooking_gourmet/", "https://www.tiktok.com/@cooking.gourmet.oficial"],
  };
  const graph: Record<string, unknown>[] = [org, { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: meta.title, description: meta.description, inLanguage: "es-PE" }];
  if (path !== "/" && meta.known) graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: meta.program?.title ?? meta.workshop?.title ?? "Especialización", item: canonical },
  ] });
  if (meta.program) graph.push({
    "@type": "Course", "@id": `${canonical}#course`, name: meta.program.title, description: meta.program.description, url: canonical,
    provider: { "@id": org["@id"] }, image, inLanguage: "es-PE",
    ...(isAdmissionProgram(meta.program.slug) ? { hasCourseInstance: { "@type": "CourseInstance", startDate: ADMISSION.date, courseMode: "Presencial", location: { "@type": "Place", name: "Cooking Gourmet, Huancayo" } } } : {}),
  });
  const tag = (name: string, content: string, property = false) => `<meta data-cg-seo ${property ? "property" : "name"}="${name}" content="${escape(content)}" />`;
  return [
    `<title data-cg-seo>${escape(meta.title)}</title>`, tag("description",meta.description),
    tag("robots",meta.known ? "index, follow, max-image-preview:large" : "noindex, follow"),
    meta.known ? `<link data-cg-seo rel="canonical" href="${escape(canonical)}" />` : "",
    tag("og:type","website",true), tag("og:site_name","Cooking Gourmet",true), tag("og:locale","es_PE",true), tag("og:title",meta.title,true), tag("og:description",meta.description,true), tag("og:url",canonical,true), tag("og:image",image,true), tag("og:image:alt",meta.title,true),
    tag("twitter:card","summary_large_image"), tag("twitter:title",meta.title), tag("twitter:description",meta.description), tag("twitter:image",image),
    meta.known ? `<script data-cg-seo type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>` : "",
  ].join("\n");
}

export function applyPageSeo(path: string) {
  document.head.querySelectorAll("[data-cg-seo], title").forEach(el => el.remove());
  document.head.insertAdjacentHTML("beforeend", renderSeoHead(path));
}
