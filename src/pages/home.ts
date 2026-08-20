import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderHeroSlider, initHeroSlider } from "../components/hero/heroSlider";
import { renderAboutSection } from "../components/sections/about/about";
import { renderWorkshopsSection } from "../components/sections/workshops/workshops";
import {
  renderCareersSection,
  initCareersSection,
} from "../components/sections/careers/careers";
import { renderContactSection } from "../components/sections/contact/contact";
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

  setMetaContent('meta[name="description"]', description);

  setMetaContent(
    'meta[name="keywords"]',
    "Cooking Gourmet, escuela de gastronomía en Huancayo, instituto de cocina en Huancayo, gastronomía profesional Huancayo, pastelería profesional Huancayo, barismo profesional, bar profesional, sommelier, cocina acelerada"
  );

  setMetaContent(
    'meta[name="robots"]',
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );

  setMetaContent('meta[property="og:type"]', "website");
  setMetaContent('meta[property="og:site_name"]', SITE_NAME);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:image"]', SITE_IMAGE);
  setMetaContent('meta[property="og:image:secure_url"]', SITE_IMAGE);
  setMetaContent('meta[property="og:image:width"]', "1200");
  setMetaContent('meta[property="og:image:height"]', "630");
  setMetaContent(
    'meta[property="og:image:alt"]',
    "Cooking Gourmet Huancayo - Escuela de gastronomía y alta cocina"
  );
  setMetaContent('meta[property="og:locale"]', "es_PE");

  setMetaContent('meta[name="twitter:card"]', "summary_large_image");
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', SITE_IMAGE);
  setMetaContent(
    'meta[name="twitter:image:alt"]',
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
        email: "j.ventas@cookingourmet.edu.pe",
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



function homeWhatsAppUrl(topic: string) {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    `Me interesa ${topic}.`,
    "Quiero conocer las opciones disponibles, horarios e inversión.",
  ].join("\n");

  return `https://wa.me/51981377382?text=${encodeURIComponent(message)}`;
}

function renderHomeChoiceSection() {
  return `
    <section class="home-choice" aria-labelledby="home-choice-title" data-reveal-section>
      <div class="container">
        <div class="home-choice__heading" data-reveal>
          <span class="home-choice__eyebrow">Encuentra tu opción</span>
          <h2 id="home-choice-title">¿Qué quieres aprender?</h2>
          <p>Elige el tipo de formación que mejor se adapta a tu objetivo.</p>
        </div>

        <div class="home-choice__grid">
          <a class="home-choice-card home-choice-card--primary" href="#programas" data-reveal style="--reveal-delay: 60ms" data-track-event="home_choice_programs_click">
            <span class="home-choice-card__number">01</span>
            <div>
              <span class="home-choice-card__tag">Formación profesional</span>
              <h3>Quiero estudiar una carrera gastronómica</h3>
              <p>Programas presenciales para formarte con práctica y una ruta de aprendizaje completa.</p>
            </div>
            <span class="home-choice-card__link">Ver programas <b>→</b></span>
          </a>

          <a class="home-choice-card" href="#talleres" data-reveal style="--reveal-delay: 120ms" data-track-event="home_choice_workshops_click">
            <span class="home-choice-card__number">02</span>
            <div>
              <span class="home-choice-card__tag">Cursos cortos</span>
              <h3>Quiero aprender algo práctico en pocos días</h3>
              <p>Revisa los próximos talleres, contenido, fechas, inversión y cupos disponibles.</p>
            </div>
            <span class="home-choice-card__link">Ver talleres <b>→</b></span>
          </a>

          <a class="home-choice-card" href="/especializacion" data-reveal style="--reveal-delay: 180ms" data-track-event="home_choice_specialization_click">
            <span class="home-choice-card__number">03</span>
            <div>
              <span class="home-choice-card__tag">Especialización</span>
              <h3>Quiero fortalecer una habilidad específica</h3>
              <p>Conoce nuestras propuestas de especialización y formación aplicada.</p>
            </div>
            <span class="home-choice-card__link">Ver especializaciones <b>→</b></span>
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderHomeTrustStrip() {
  return `
    <section class="home-trust" aria-label="Datos principales de Cooking Gourmet" data-reveal-section>
      <div class="container home-trust__grid">
        <div class="home-trust__item" data-reveal>
          <strong>Desde 2008</strong>
          <span>Trayectoria en Huancayo</span>
        </div>
        <div class="home-trust__item" data-reveal style="--reveal-delay: 50ms">
          <strong>Presencial</strong>
          <span>Aprendizaje práctico</span>
        </div>
        <div class="home-trust__item" data-reveal style="--reveal-delay: 100ms">
          <strong>Huancayo</strong>
          <span>Av. Ferrocarril 587</span>
        </div>
        <div class="home-trust__item" data-reveal style="--reveal-delay: 150ms">
          <strong>Programas + talleres</strong>
          <span>Opciones para distintos objetivos</span>
        </div>
      </div>
    </section>
  `;
}

function renderHomeWhySection() {
  const items = [
    {
      number: "01",
      title: "Aprendizaje práctico",
      text: "La propuesta académica prioriza la práctica para que el estudiante participe y aplique lo aprendido.",
    },
    {
      number: "02",
      title: "Docentes del rubro",
      text: "Las clases se desarrollan con acompañamiento docente y orientación aplicada al entorno gastronómico.",
    },
    {
      number: "03",
      title: "Opciones para distintos objetivos",
      text: "Puedes elegir programas profesionales, especializaciones o talleres cortos según el tiempo que tengas disponible.",
    },
    {
      number: "04",
      title: "Atención en Huancayo",
      text: "Puedes solicitar información por WhatsApp o visitar nuestra sede para recibir orientación antes de matricularte.",
    },
  ];

  return `
    <section class="home-why" aria-labelledby="home-why-title" data-reveal-section>
      <div class="container">
        <div class="home-section-heading" data-reveal>
          <span class="home-eyebrow">Antes de elegir</span>
          <h2 id="home-why-title">Una formación pensada para aprender haciendo</h2>
          <p>Información clara, práctica presencial y alternativas para quienes quieren iniciar, mejorar o especializarse.</p>
        </div>

        <div class="home-why-grid">
          ${items
            .map(
              (item, index) => `
                <article class="home-why-card" data-reveal style="--reveal-delay: ${index * 55}ms">
                  <span class="home-why-card__icon">${item.number}</span>
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHomeFaqSection() {
  const faqs = [
    {
      question: "¿Las clases son presenciales?",
      answer:
        "Sí. Cooking Gourmet brinda formación presencial en Huancayo. En cada programa o taller puedes revisar su modalidad y consultar los horarios disponibles.",
    },
    {
      question: "¿Cómo puedo saber el precio y los horarios?",
      answer:
        "En los talleres publicados mostramos la inversión y las fechas disponibles. Para programas profesionales, admisión puede brindarte horarios, matrícula y mensualidad por WhatsApp.",
    },
    {
      question: "¿Puedo llevar solo un taller corto?",
      answer:
        "Sí. Los talleres son opciones independientes para quienes desean aprender un tema específico sin ingresar necesariamente a un programa profesional.",
    },
    {
      question: "¿Dónde está Cooking Gourmet?",
      answer:
        "Nuestra sede está en Av. Ferrocarril 587, Huancayo, Junín. Puedes encontrar el acceso a la ubicación en la sección de contacto.",
    },
  ];

  return `
    <section class="home-faq" aria-labelledby="home-faq-title" data-reveal-section>
      <div class="container">
        <div class="home-section-heading" data-reveal>
          <span class="home-eyebrow">Preguntas frecuentes</span>
          <h2 id="home-faq-title">Resuelve tus dudas antes de escribirnos</h2>
          <p>Te dejamos las respuestas a las consultas más comunes sobre nuestros programas y talleres.</p>
        </div>

        <div class="home-faq-list">
          ${faqs
            .map(
              (faq, index) => `
                <details class="home-faq-item" data-reveal style="--reveal-delay: ${index * 45}ms">
                  <summary>${faq.question}</summary>
                  <p>${faq.answer}</p>
                </details>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHomeFinalCta() {
  return `
    <section class="home-final-cta" aria-labelledby="home-final-title" data-reveal-section>
      <div class="container">
        <div class="home-final-cta__box" data-reveal>
          <span class="home-eyebrow">Admisión Cooking Gourmet</span>
          <h2 id="home-final-title">¿Aún no sabes qué programa o taller elegir?</h2>
          <p>Cuéntanos qué quieres aprender y te orientamos con las opciones, horarios e inversión disponibles.</p>
          <div class="home-final-cta__actions">
            <a class="btn btn--primary" href="${homeWhatsAppUrl("orientación para elegir un programa o taller")}" target="_blank" rel="noopener noreferrer" data-track-event="home_final_whatsapp_click">Hablar por WhatsApp</a>
            <a class="btn btn--ghost" href="#talleres" data-track-event="home_final_workshops_click">Ver talleres</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHomePage() {
  return `
    <div class="site-shell">
      ${renderHeader()}

      <main class="page-home">
        ${renderHeroSlider()}
        ${renderHomeTrustStrip()}
        ${renderHomeChoiceSection()}
        ${renderWorkshopsSection()}
        ${renderCareersSection()}
        ${renderHomeWhySection()}
        ${renderAboutSection()}
        ${renderHomeFaqSection()}
        ${renderContactSection()}
        ${renderHomeFinalCta()}
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initHomePage() {
  initHeader();
  applyHomeSeo();
  initHeroSlider();
  initCareersSection();
}