'use client'

import { useState } from 'react'
import type { Lang } from '@/lib/getLetters'

// ── Texter per språk ─────────────────────────────────────────────────────────

const ui = {
  sv: {
    eyebrow: '// MJUKVARUUTVECKLARE — DESIGNFOKUS',
    greeting: 'Hej!',
    section1Title: 'Design och utbildningsbakgrund',
    section1Lead: 'Användarcentrerad design som grund — från UX-forskning och wireframing till designsystem och visuell kommunikation.',
    card1Title: 'UX/UI-design',
    card1Body: 'Användarforskning, personas, wireframing, prototyping och visuell kommunikation som grund för all utveckling',
    card2Title: 'Designsystem och arkitektur',
    card2Body: 'Skapande av sammanhängande designsystem som stödjer skalbar utveckling och konsistent användarupplevelse',
    card3Title: 'Tvärvetenskapligt tänkande',
    card3Body: 'Integration av design, teknik och affärsförståelse för helhetslösningar som fungerar i verkligheten',
    hint1: '▸ Detaljerade fallstudier och designprocessexempel finns dokumenterade i min fullständiga profil',
    section2Title: 'Tekniska färdigheter och implementation',
    section2Lead: 'React, Next.js, TypeScript, Tailwind CSS — med designkvalitet och tillgänglighet som utgångspunkt i varje projekt.',
    card4Title: 'Modern frontend-utveckling',
    card4Body: 'React, Next.js, TypeScript, Tailwind CSS — verktyg som möjliggör designdriven utveckling',
    card5Title: 'Design-till-kod-implementation',
    card5Body: 'Responsiv design, micro-interactions, tillgänglighet och prestandaoptimering',
    card6Title: 'Utvecklingsprocesser',
    card6Body: 'Git-arbetsflöden, agila metoder, prototyping och integration av användartestning',
    hint2: '▸ Tekniska djupdykningar och kodexempel med designmotivering finns i min kompletta dokumentation',
    ctaText: 'Utforska min kompletta profil med detaljerade projektbeskrivningar, designprocesser och teknisk dokumentation',
    ctaBtn: 'FULLSTÄNDIG PROFIL',
    readMore: 'LÄS MER',
    close: 'STÄNG',
    address: 'profil.dev/sv',
  },
  eu: {
    eyebrow: '// SOFTWARE DEVELOPER — DESIGN FOCUS',
    greeting: 'Hello!',
    section1Title: 'Design & educational background',
    section1Lead: 'User-centered design as the foundation — from UX research and wireframing to design systems and visual communication.',
    card1Title: 'UX/UI design',
    card1Body: 'User research, personas, wireframing, prototyping and visual communication as the foundation for all development',
    card2Title: 'Design systems & architecture',
    card2Body: 'Creating cohesive design systems that support scalable development and consistent user experience',
    card3Title: 'Interdisciplinary thinking',
    card3Body: 'Integration of design, technology and business understanding for holistic solutions that work in reality',
    hint1: '▸ Detailed case studies and design process examples are documented in my complete profile',
    section2Title: 'Technical skills & implementation',
    section2Lead: 'React, Next.js, TypeScript, Tailwind CSS — with design quality and accessibility as the starting point in every project.',
    card4Title: 'Modern frontend development',
    card4Body: 'React, Next.js, TypeScript, Tailwind CSS — tools that enable design-driven development',
    card5Title: 'Design-to-code implementation',
    card5Body: 'Responsive design, micro-interactions, accessibility and performance optimization',
    card6Title: 'Development processes',
    card6Body: 'Git workflows, agile methods, prototyping and user testing integration',
    hint2: '▸ Technical deep-dives and code examples with design rationale in my complete documentation',
    ctaText: 'Explore my complete profile with detailed project descriptions, design processes and technical documentation',
    ctaBtn: 'FULL PROFILE',
    readMore: 'READ MORE',
    close: 'CLOSE',
    address: 'profil.dev/eu',
  },
  cas: {
    eyebrow: '// DESARROLLADOR DE SOFTWARE — ENFOQUE EN DISEÑO',
    greeting: '¡Hola!',
    section1Title: 'Diseño y formación académica',
    section1Lead: 'Diseño centrado en el usuario como base — desde investigación UX y wireframing hasta sistemas de diseño y comunicación visual.',
    card1Title: 'Diseño UX/UI',
    card1Body: 'Investigación de usuarios, personas, wireframing, prototipado y comunicación visual como base para todo desarrollo',
    card2Title: 'Sistemas de diseño y arquitectura',
    card2Body: 'Creación de sistemas de diseño cohesivos que apoyan el desarrollo escalable y una experiencia de usuario consistente',
    card3Title: 'Pensamiento interdisciplinario',
    card3Body: 'Integración de diseño, tecnología y comprensión empresarial para soluciones holísticas que funcionan en la realidad',
    hint1: '▸ Estudios de caso y ejemplos de proceso de diseño documentados en mi perfil completo',
    section2Title: 'Habilidades técnicas e implementación',
    section2Lead: 'React, Next.js, TypeScript, Tailwind CSS — con calidad de diseño y accesibilidad como punto de partida en cada proyecto.',
    card4Title: 'Desarrollo frontend moderno',
    card4Body: 'React, Next.js, TypeScript, Tailwind CSS — herramientas que permiten desarrollo dirigido por diseño',
    card5Title: 'Implementación diseño-a-código',
    card5Body: 'Diseño responsivo, micro-interacciones, accesibilidad y optimización de rendimiento',
    card6Title: 'Procesos de desarrollo',
    card6Body: 'Flujos de trabajo Git, métodos ágiles, prototipado e integración de pruebas de usuario',
    hint2: '▸ Análisis técnicos y ejemplos de código con justificación de diseño en mi documentación completa',
    ctaText: 'Explora mi perfil completo con descripciones detalladas de proyectos, procesos de diseño y documentación técnica',
    ctaBtn: 'PERFIL COMPLETO',
    readMore: 'LEER MÁS',
    close: 'CERRAR',
    address: 'profil.dev/cas',
  },
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface ProfileContentProps {
  initialLang?: Lang
  // Anpassad text för brevversionen — om undefined används standardtext
  customGreeting?: string
  customIntro?: string
  customNote?: string
  // Om true visas inte språkväxlaren (brevversionen är låst till ett språk)
  lockLang?: boolean
}

// ── Expanderbar sektion ───────────────────────────────────────────────────────

function Section({
  icon,
  title,
  readMore,
  close,
  accentColor,
  children,
}: {
  icon: string
  title: string
  readMore: string
  close: string
  accentColor: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-5">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left transition-all duration-300"
        style={{
          background: open ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.04)',
          border: `1px solid ${open ? 'rgba(6,182,212,0.3)' : 'rgba(6,182,212,0.18)'}`,
          borderRadius: open ? '12px 12px 0 0' : '12px',
          borderLeft: `3px solid ${accentColor}`,
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
        <span
          style={{
            flex: 1,
            fontFamily: 'Syne, sans-serif',
            fontSize: '1.1rem',
            color: 'rgba(224,242,254,0.95)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: open ? '#FF3366' : '#06B6D4',
            border: `1px solid ${open ? 'rgba(255,51,102,0.35)' : 'rgba(6,182,212,0.3)'}`,
            padding: '5px 12px',
            borderRadius: '4px',
            background: open ? 'rgba(255,51,102,0.1)' : 'transparent',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.4s',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          >
            ▾
          </span>
          {open ? close : readMore}
        </span>
      </button>

      {/* Content */}
      <div
        style={{
          maxHeight: open ? '1400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div
          style={{
            border: '1px solid rgba(6,182,212,0.18)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            padding: '28px',
            background: 'rgba(5,0,40,0.5)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Kort ─────────────────────────────────────────────────────────────────────

function Card({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div
      style={{
        background: 'rgba(6,182,212,0.04)',
        border: '1px solid rgba(6,182,212,0.18)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '10px',
        padding: '18px',
        transition: 'all 0.3s',
      }}
    >
      <p style={{ fontWeight: 600, color: accent, marginBottom: '8px', fontSize: '0.95rem' }}>
        <span style={{ color: '#FF3366', marginRight: '6px' }}>→</span>
        {title}
      </p>
      <p style={{ color: 'rgba(100,160,190,0.5)', fontSize: '0.88rem', lineHeight: 1.65 }}>{body}</p>
    </div>
  )
}

// ── Huvudkomponent ────────────────────────────────────────────────────────────

export default function ProfileContent({
  initialLang = 'sv',
  customGreeting,
  customIntro,
  customNote,
  lockLang = false,
}: ProfileContentProps) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = ui[lang]

  const greeting = customGreeting ?? t.greeting
  const intro    = customIntro    ?? (lang === 'sv'
    ? 'Jag är en tvärvetenskaplig mjukvaruutvecklare med designfokus som brinner för att skapa användarcentrerade digitala upplevelser. Med över 12 års studier inom UX/UI-design, programmering och systemarkitektur har jag utvecklat kunskaper och förståelse som kan stödja arbetet med att bygga en bro mellan användarnas faktiska behov och den bakomliggande tekniska verkligheten.'
    : lang === 'eu'
    ? "I'm an interdisciplinary software developer with a design focus, passionate about creating user-centered digital experiences. With over 12 years of study in UX/UI design, programming, and system architecture, I've developed the skills and understanding necessary to bridge the gap between actual user needs and the underlying technical reality."
    : 'Soy un desarrollador de software interdisciplinario con enfoque en diseño, apasionado por crear experiencias digitales centradas en el usuario. Con más de 12 años de estudio en diseño UX/UI, programación y arquitectura de sistemas, he desarrollado habilidades y comprensión necesarias para conciliar las necesidades del usuario final con el entorno técnico subyacente.')
  const note = customNote ?? (lang === 'sv'
    ? 'Detta är en komprimerad översikt av mina kompetenser — en fullständig presentation med projektexempel och djupgående teknisk dokumentation finns tillgänglig i min kompletta profil och CV.'
    : lang === 'eu'
    ? 'This is a condensed overview of my competencies — a complete presentation with project examples and in-depth technical documentation is available in my full profile and CV.'
    : 'Esta es una descripción condensada de mis competencias — una presentación completa con ejemplos de proyectos y documentación técnica detallada está disponible en mi perfil completo y CV.')

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 60px' }}>

      {/* Browser frame */}
      <div
        className="animate-frame"
        style={{
          width: '100%',
          maxWidth: '720px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(6,182,212,0.18)',
          boxShadow: '0 0 60px rgba(6,182,212,0.1), 0 0 120px rgba(139,92,246,0.06)',
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 20px',
            background: '#080045',
            borderBottom: '1px solid rgba(6,182,212,0.18)',
          }}
        >
          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#FF3366', '#F59E0B', '#10B981'].map((c) => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}`, display: 'inline-block' }} />
            ))}
          </div>

          {/* Address */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                background: 'rgba(6,182,212,0.06)',
                border: '1px solid rgba(6,182,212,0.18)',
                borderRadius: '6px',
                padding: '5px 16px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: '#06B6D4',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: '#10B981', fontSize: '9px' }}>🔒</span>
              {t.address}
            </div>
          </div>

          {/* Lang switcher — dold om lockLang=true */}
          {!lockLang && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['sv', 'eu', 'cas'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    height: '32px',
                    padding: '0 10px',
                    background: lang === l ? '#FF3366' : 'rgba(6,182,212,0.05)',
                    border: `1px solid ${lang === l ? '#FF3366' : 'rgba(6,182,212,0.18)'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.05em',
                    color: lang === l ? 'white' : 'rgba(100,160,190,0.5)',
                    boxShadow: lang === l ? '0 0 14px rgba(255,51,102,0.35)' : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  {l === 'sv' ? '🇸🇪 SV' : l === 'eu' ? '🇪🇺 EU' : '🇪🇸 CAS'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content area */}
        <div style={{ background: '#080045' }}>
          <div style={{ padding: '48px 40px' }}>

            {/* Header */}
            <div style={{ marginBottom: '44px' }}>
              <p className="animate-fade-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#06B6D4', marginBottom: '10px' }}>
                {t.eyebrow}
              </p>
              <h1
                className="animate-fade-2"
                style={{
                  fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
                  fontWeight: 200,
                  letterSpacing: '-2px',
                  background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #FF3366 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '22px',
                  lineHeight: 1.05,
                }}
              >
                {greeting}
              </h1>
              <p className="animate-fade-3" style={{ color: 'rgba(148,214,240,0.72)', fontSize: '1.07rem', fontWeight: 300, lineHeight: 1.85, maxWidth: '580px', marginBottom: '20px' }}>
                {intro}
              </p>
              <div
                className="animate-fade-4"
                style={{
                  color: 'rgba(100,160,190,0.5)',
                  fontSize: '0.87rem',
                  fontStyle: 'italic',
                  maxWidth: '540px',
                  padding: '14px 20px',
                  background: 'rgba(6,182,212,0.04)',
                  border: '1px solid rgba(6,182,212,0.18)',
                  borderLeft: '3px solid #06B6D4',
                  borderRadius: '0 8px 8px 0',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {note}
              </div>
            </div>

            {/* Gradient divider */}
            <div style={{ display: 'flex', height: '3px', marginBottom: '28px' }}>
              <div style={{ flex: 1, background: '#06B6D4' }} />
              <div style={{ flex: 1, background: '#8B5CF6' }} />
              <div style={{ flex: 1, background: '#FF3366' }} />
            </div>

            {/* Section 1 */}
            <Section icon="⚈" title={t.section1Title} readMore={t.readMore} close={t.close} accentColor="#06B6D4">
              <p style={{ color: 'rgba(148,214,240,0.72)', fontSize: '0.98rem', lineHeight: 1.9, marginBottom: '24px' }}>
                {t.section1Lead}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <Card title={t.card1Title} body={t.card1Body} accent="#06B6D4" />
                <Card title={t.card2Title} body={t.card2Body} accent="#8B5CF6" />
                <Card title={t.card3Title} body={t.card3Body} accent="#FF3366" />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', color: 'rgba(100,160,190,0.5)', textAlign: 'center', padding: '12px 18px', background: 'rgba(6,182,212,0.03)', border: '1px dashed rgba(6,182,212,0.15)', borderRadius: '6px' }}>
                {t.hint1}
              </p>
            </Section>

            {/* Section 2 */}
            <Section icon="▷" title={t.section2Title} readMore={t.readMore} close={t.close} accentColor="#FF3366">
              <p style={{ color: 'rgba(148,214,240,0.72)', fontSize: '0.98rem', lineHeight: 1.9, marginBottom: '24px' }}>
                {t.section2Lead}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <Card title={t.card4Title} body={t.card4Body} accent="#FF3366" />
                <Card title={t.card5Title} body={t.card5Body} accent="#10B981" />
                <Card title={t.card6Title} body={t.card6Body} accent="#F59E0B" />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', color: 'rgba(100,160,190,0.5)', textAlign: 'center', padding: '12px 18px', background: 'rgba(6,182,212,0.03)', border: '1px dashed rgba(6,182,212,0.15)', borderRadius: '6px' }}>
                {t.hint2}
              </p>
            </Section>
          </div>

          {/* CTA */}
          <div
            style={{
              textAlign: 'center',
              padding: '50px 40px',
              background: 'rgba(5,0,40,0.5)',
              borderTop: '1px solid rgba(6,182,212,0.18)',
            }}
          >
            <p style={{ color: 'rgba(148,214,240,0.72)', marginBottom: '28px', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 28px' }}>
              {t.ctaText}
            </p>
            <a
              href="https://profil.dev/sv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 30px',
                borderRadius: '8px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                color: '#06B6D4',
                border: '1px solid #06B6D4',
                textDecoration: 'none',
                boxShadow: '0 0 16px rgba(6,182,212,0.1)',
                transition: 'all 0.3s',
              }}
            >
              {t.ctaBtn} <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <footer
        style={{
          marginTop: '32px',
          textAlign: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: 'rgba(100,160,190,0.5)',
          letterSpacing: '0.12em',
        }}
      >
        {new Date().getFullYear()} — MJUKVARUUTVECKLARE — STOCKHOLM, SE
      </footer>
    </div>
  )
}
