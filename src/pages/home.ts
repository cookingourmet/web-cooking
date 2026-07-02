import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderHeroSlider, initHeroSlider } from "../components/hero/heroSlider";
import { renderAboutSection } from "../components/sections/about/about";
import { renderCareersSection } from "../components/sections/careers/careers";
import { renderFooter } from "../components/layout/footer/footer";

const SITE_URL = "https://www.cookingourmet.edu.pe";
const SITE_NAME = "Cooking Gourmet";
const SITE_LOGO = `${SITE_URL}/logo.png`;
const SITE_IMAGE = `${SITE_URL}/images/seo/cooking-gourmet-portada.jpg`;

const ORGANIZATION = {
  name: "Cooking Gourmet",
  url: SITE_URL,
  phone: "+51 981 377 382",
  whatsapp: "https://wa.me/51981377382",
  address: "Av. Ferrocarril 587",
  city: "Huancayo",
  region: "Junín",
  country: "PE",
};

const PROGRAMS = [
  {
    name: "Gastronomía Profesional",
    url: `${SITE_URL}/programas/gastronomia`,
    description:
      "Programa profesional de gastronomía presencial en Huancayo.",
  },
  {
    name: "Pastelería Profesional",
    url: `${SITE_URL}/programas/pasteleria`,
    description:
      "Programa profesional de panadería y pastelería presencial en Huancayo.",
  },
  {
    name: "Bar Profesional",
    url: `${SITE_URL}/programas/bar-profesional`,
    description:
      "Programa de bar profesional, coctelería y servicio de barra en Huancayo.",
  },
  {
    name: "Barismo Profesional",
    url: `${SITE_URL}/programas/barismo`,
    description:
      "Programa de barismo profesional, café de especialidad y métodos de preparación en Huancayo.",
  },
  {
    name: "Sommelier Profesional",
    url: `${SITE_URL}/programas/sommelier`,
    description:
      "Programa de sommelier profesional, cata, maridaje y servicio de vinos en Huancayo.",
  },
  {
    name: "Cocina Acelerada",
    url: `${SITE_URL}/programas/cocina-acelerada`,
    description:
      "Programa intensivo de cocina acelerada con formación práctica presencial en Huancayo.",
  },
];

function setMetaContent(selector: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (!meta) {
    meta = document.createElement("meta");

    if (selector.includes('property="')) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) meta.setAttribute("property", property);
    } else {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) meta.setAttribute("name", name);
    }

    document.head.appendChild(meta);
  }

  meta.content = content;
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

function setAlternateLink(hreflang: string, href: string) {
  let alternate = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );

  if (!alternate) {
    alternate = document.createElement("link");
    alternate.rel = "alternate";
    alternate.hreflang = hreflang;
    document.head.appendChild(alternate);
  }

  alternate.href = href;
}

function removePreviousHomeSchema() {
  document.getElementById("home-schema")?.remove();

  document
    .querySelectorAll('script[data-seo-schema="base"]')
    .forEach((script) => script.remove());
}

function applyHomeSeo() {
  const title =
    "Cooking Gourmet Huancayo | Gastronomía, Pastelería, Barismo y Cocina Profesional";

  const description =
    "Estudia en Cooking Gourmet Huancayo. Programas presenciales de Gastronomía Profesional, Pastelería, Bar Profesional, Barismo, Sommelier y Cocina Acelerada.";

  const canonicalUrl = SITE_URL;

  document.title = title;

  setMetaContent("meta[name=\"description\"]", description);
  setMetaContent(
    "meta[name=\"keywords\"]",
    "Cooking Gourmet, escuela de gastronomía en Huancayo, instituto de cocina en Huancayo, gastronomía profesional Huancayo, pastelería profesional Huancayo, barismo profesional, bar profesional, sommelier, cocina acelerada"
  );
  setMetaContent(
    "meta[name=\"robots\"]",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );

  setMetaContent("meta[property=\"og:type\"]", "website");
  setMetaContent("meta[property=\"og:site_name\"]", SITE_NAME);
  setMetaContent("meta[property=\"og:title\"]", title);
  setMetaContent("meta[property=\"og:description\"]", description);
  setMetaContent("meta[property=\"og:url\"]", canonicalUrl);
  setMetaContent("meta[property=\"og:image\"]", SITE_IMAGE);
  setMetaContent("meta[property=\"og:image:secure_url\"]", SITE_IMAGE);
  setMetaContent("meta[property=\"og:image:width\"]", "1200");
  setMetaContent("meta[property=\"og:image:height\"]", "630");
  setMetaContent(
    "meta[property=\"og:image:alt\"]",
    "Cooking Gourmet Huancayo - Escuela de gastronomía y alta cocina"
  );
  setMetaContent("meta[property=\"og:locale\"]", "es_PE");

  setMetaContent("meta[name=\"twitter:card\"]", "summary_large_image");
  setMetaContent("meta[name=\"twitter:title\"]", title);
  setMetaContent("meta[name=\"twitter:description\"]", description);
  setMetaContent("meta[name=\"twitter:image\"]", SITE_IMAGE);
  setMetaContent(
    "meta[name=\"twitter:image:alt\"]",
    "Cooking Gourmet Huancayo - Escuela de gastronomía y alta cocina"
  );

  setCanonical(canonicalUrl);
  setAlternateLink("es-PE", canonicalUrl);
  setAlternateLink("x-default", canonicalUrl);

  removePreviousHomeSchema();

  const schema = document.createElement("script");
  schema.id = "home-schema";
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: ORGANIZATION.name,
        alternateName: "Cooking Gourmet Escuela de Alta Cocina",
        description:
          "Escuela gastronómica en Huancayo con programas presenciales de gastronomía profesional, pastelería, bar profesional, barismo, sommelier y cocina acelerada.",
        url: ORGANIZATION.url,
        logo: SITE_LOGO,
        image: SITE_IMAGE,
        telephone: ORGANIZATION.phone,
        email: "ventas@cookingourmet.edu.pe",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: ORGANIZATION.address,
          addressLocality: ORGANIZATION.city,
          addressRegion: ORGANIZATION.region,
          addressCountry: ORGANIZATION.country,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Huancayo",
          },
          {
            "@type": "AdministrativeArea",
            name: "Junín",
          },
        ],
        sameAs: [
          "https://www.facebook.com/Cooking.Gourmet",
          "https://www.instagram.com/cooking_gourmet/",
          "https://www.tiktok.com/@cooking.gourmet.oficial",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: ORGANIZATION.phone,
          contactType: "admisiones",
          areaServed: "PE",
          availableLanguage: "Spanish",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "es-PE",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: title,
        headline: "Escuela de Gastronomía en Huancayo",
        description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SITE_IMAGE,
          width: 1200,
          height: 630,
        },
        inLanguage: "es-PE",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#programs`,
        name: "Programas profesionales de Cooking Gourmet en Huancayo",
        itemListElement: PROGRAMS.map((program, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Course",
            name: program.name,
            description: program.description,
            url: program.url,
            provider: {
              "@id": `${SITE_URL}/#organization`,
            },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
        ],
      },
    ],
  });

  document.head.appendChild(schema);
}

export function renderHomePage() {
  return `
    <div class="site-shell">
      ${renderHeader()}

      <main class="page-home">
        ${renderHeroSlider()}
        ${renderAboutSection()}
        ${renderCareersSection()}
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initHomePage() {
  initHeader();
  applyHomeSeo();
  initHeroSlider();
}