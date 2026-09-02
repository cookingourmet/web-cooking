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
        ${renderCareersSection()}
        ${renderHomeChoiceSection()}
        ${renderWorkshopsSection()}
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
  initHeroSlider();
  initCareersSection();
}