'use client'

import { useState, useEffect } from 'react'
import type { Lang } from '@/lib/getLetters'

// ── Tema-färger ───────────────────────────────────────────────────────────────

const themes = {
  dark: {
    bg:          '#050038',
    bgMid:       '#080045',
    bgCard:      'rgba(6,182,212,0.04)',
    bgCardHover: 'rgba(6,182,212,0.08)',
    bgSection:   'rgba(5,0,40,0.5)',
    text:        'rgba(224,242,254,0.95)',
    textMid:     'rgba(148,214,240,0.72)',
    textDim:     'rgba(100,160,190,0.5)',
    border:      'rgba(6,182,212,0.18)',
    borderOpen:  'rgba(6,182,212,0.3)',
    themeBtnBg:  'rgba(6,182,212,0.06)',
    themeBtnIcon:'🌙',
    scanlines:   true,
  },
  light: {
    bg:          '#eef2ff',
    bgMid:       '#f4f7ff',
    bgCard:      'rgba(139,92,246,0.04)',
    bgCardHover: 'rgba(139,92,246,0.08)',
    bgSection:   'rgba(238,242,255,0.5)',
    text:        'rgba(15,23,42,0.95)',
    textMid:     'rgba(51,65,85,0.80)',
    textDim:     'rgba(100,116,139,0.7)',
    border:      'rgba(139,92,246,0.18)',
    borderOpen:  'rgba(139,92,246,0.35)',
    themeBtnBg:  'rgba(139,92,246,0.08)',
    themeBtnIcon:'☀️',
    scanlines:   false,
  },
}

// ── Texter per språk ──────────────────────────────────────────────────────────

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
  customGreeting?: string
  customIntro?: string
  customNote?: string
  lockLang?: boolean
}

// ── Expanderbar sektion ───────────────────────────────────────────────────────

function Section({
  icon,
  title,
  readMore,
  close,
  accentColor,
  theme,
  children,
}: {
  icon: string
  title: string
  readMore: string
  close: string
  accentColor: string
  theme: typeof themes.dark
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  // Fix: separata border-properties — ingen konflikt mellan border och borderLeft
  const borderStyle = {
    borderTop:    `1px solid ${open ? theme.borderOpen : theme.border}`,
    borderRight:  `1px solid ${open ? theme.borderOpen : theme.border}`,
    borderBottom: `1px solid ${open ? theme.borderOpen : theme.border}`,
    borderLeft:   `3px solid ${accentColor}`,
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '20px 22px',
          textAlign: 'left',
          cursor: 'pointer',
          background: open ? theme.bgCardHover : theme.bgCard,
          borderRadius: open ? '12px 12px 0 0' : '12px',
          transition: 'all 0.3s',
          ...borderStyle,
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
        <span style={{ flex: 1, fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: theme.text }}>
          {title}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: open ? '#FF3366' : '#06B6D4',
            borderTop:    `1px solid ${open ? 'rgba(255,51,102,0.35)' : 'rgba(6,182,212,0.3)'}`,
            borderRight:  `1px solid ${open ? 'rgba(255,51,102,0.35)' : 'rgba(6,182,212,0.3)'}`,
            borderBottom: `1px solid ${open ? 'rgba(255,51,102,0.35)' : 'rgba(6,182,212,0.3)'}`,
            borderLeft:   `1px solid ${open ? 'rgba(255,51,102,0.35)' : 'rgba(6,182,212,0.3)'}`,
            padding: '5px 12px',
            borderRadius: '4px',
            background: open ? 'rgba(255,51,102,0.1)' : 'transparent',
            whiteSpace: 'nowrap' as const,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ display: 'inline-block', transition: 'transform 0.4s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
          {open ? close : readMore}
        </span>
      </button>

      <div style={{ maxHeight: open ? '1400px' : '0', overflow: 'hidden', transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)' }}>
        <div
          style={{
            borderTop:    'none',
            borderRight:  `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
            borderLeft:   `1px solid ${theme.border}`,
            borderRadius: '0 0 12px 12px',
            padding: '28px',
            background: theme.bgSection,
            transition: 'background 0.4s',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Kort ──────────────────────────────────────────────────────────────────────

function Card({ title, body, accent, theme }: { title: string; body: string; accent: string; theme: typeof themes.dark }) {
  return (
    <div
      style={{
        background: theme.bgCard,
        borderTop:    `1px solid ${theme.border}`,
        borderRight:  `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        borderLeft:   `3px solid ${accent}`,
        borderRadius: '10px',
        padding: '18px',
        transition: 'all 0.3s',
      }}
    >
      <p style={{ fontWeight: 600, color: accent, marginBottom: '8px', fontSize: '0.95rem' }}>
        <span style={{ color: '#FF3366', marginRight: '6px' }}>→</span>
        {title}
      </p>
      <p style={{ color: theme.textDim, fontSize: '0.88rem', lineHeight: 1.65 }}>{body}</p>
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
  const [lang, setLang]         = useState<Lang>(initialLang)
  const [isDark, setIsDark]     = useState(true)
  const t                        = ui[lang]
  const theme                    = isDark ? themes.dark : themes.light

  // Spara tema-val i localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') setIsDark(false)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const greeting = customGreeting ?? t.greeting
  const intro    = customIntro ?? (
    lang === 'sv'
      ? 'Jag är en tvärvetenskaplig mjukvaruutvecklare med designfokus som brinner för att skapa användarcentrerade digitala upplevelser. Med över 12 års studier inom UX/UI-design, programmering och systemarkitektur har jag utvecklat kunskaper och förståelse som kan stödja arbetet med att bygga en bro mellan användarnas faktiska behov och den bakomliggande tekniska verkligheten.'
      : lang === 'eu'
      ? "I'm an interdisciplinary software developer with a design focus, passionate about creating user-centered digital experiences. With over 12 years of study in UX/UI design, programming, and system architecture, I've developed the skills and understanding necessary to bridge the gap between actual user needs and the underlying technical reality."
      : 'Soy un desarrollador de software interdisciplinario con enfoque en diseño, apasionado por crear experiencias digitales centradas en el usuario. Con más de 12 años de estudio en diseño UX/UI, programación y arquitectura de sistemas, he desarrollado habilidades y comprensión necesarias para conciliar las necesidades del usuario final con el entorno técnico subyacente.'
  )
  const note = customNote ?? (
    lang === 'sv'
      ? 'Detta är en komprimerad översikt av mina kompetenser — en fullständig presentation med projektexempel och djupgående teknisk dokumentation finns tillgänglig i min kompletta profil och CV.'
      : lang === 'eu'
      ? 'This is a condensed overview of my competencies — a complete presentation with project examples and in-depth technical documentation is available in my full profile and CV.'
      : 'Esta es una descripción condensada de mis competencias — una presentación completa con ejemplos de proyectos y documentación técnica detallada está disponible en mi perfil completo y CV.'
  )

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px 60px',
        background: theme.bg,
        transition: 'background 0.4s',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: isDark
          ? 'radial-gradient(ellipse 70% 50% at 15% 25%, rgba(139,92,246,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 85% 75%, rgba(6,182,212,0.08) 0%, transparent 55%)'
          : 'radial-gradient(ellipse 70% 50% at 15% 25%, rgba(139,92,246,0.06) 0%, transparent 55%)',
        transition: 'background 0.4s',
      }} />

      {/* Browser frame */}
      <div
        className="animate-frame"
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: '720px',
          borderRadius: '16px', overflow: 'hidden',
          borderTop:    `1px solid ${theme.border}`,
          borderRight:  `1px solid ${theme.border}`,
          borderBottom: `1px solid ${theme.border}`,
          borderLeft:   `1px solid ${theme.border}`,
          boxShadow: isDark
            ? '0 0 60px rgba(6,182,212,0.1), 0 0 120px rgba(139,92,246,0.06)'
            : '0 4px 40px rgba(139,92,246,0.1)',
          transition: 'box-shadow 0.4s',
        }}
      >
        {/* Topbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px 20px',
          background: theme.bgMid,
          borderBottom: `1px solid ${theme.border}`,
          transition: 'background 0.4s',
        }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#FF3366','#F59E0B','#10B981'].map((c) => (
              <span key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, boxShadow:`0 0 8px ${c}`, display:'inline-block' }} />
            ))}
          </div>

          {/* Address bar */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: theme.bgCard,
              borderTop:    `1px solid ${theme.border}`,
              borderRight:  `1px solid ${theme.border}`,
              borderBottom: `1px solid ${theme.border}`,
              borderLeft:   `1px solid ${theme.border}`,
              borderRadius: '6px',
              padding: '5px 16px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: '#06B6D4',
              letterSpacing: '0.12em',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ color: '#10B981', fontSize: '9px' }}>🔒</span>
              {t.address}
            </div>
          </div>

          {/* Tema-knapp — alltid synlig */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Växla till ljust läge' : 'Växla till mörkt läge'}
            style={{
              width: '32px', height: '32px',
              background: theme.themeBtnBg,
              borderTop:    `1px solid ${theme.border}`,
              borderRight:  `1px solid ${theme.border}`,
              borderBottom: `1px solid ${theme.border}`,
              borderLeft:   `1px solid ${theme.border}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >
            {theme.themeBtnIcon}
          </button>

          {/* Språkväxlare — dold om lockLang=true */}
          {!lockLang && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['sv','eu','cas'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    height: '32px', padding: '0 10px',
                    background: lang === l ? '#FF3366' : theme.bgCard,
                    borderTop:    `1px solid ${lang === l ? '#FF3366' : theme.border}`,
                    borderRight:  `1px solid ${lang === l ? '#FF3366' : theme.border}`,
                    borderBottom: `1px solid ${lang === l ? '#FF3366' : theme.border}`,
                    borderLeft:   `1px solid ${lang === l ? '#FF3366' : theme.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', letterSpacing: '0.05em',
                    color: lang === l ? 'white' : theme.textDim,
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
        <div style={{ background: theme.bgMid, transition: 'background 0.4s' }}>
          <div style={{ padding: '48px 40px' }}>

            {/* Header */}
            <div style={{ marginBottom: '44px' }}>
              <p className="animate-fade-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#06B6D4', marginBottom: '10px' }}>
                {t.eyebrow}
              </p>
              <h1 className="animate-fade-2" style={{
                fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 200,
                letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '22px',
                background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #FF3366 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {greeting}
              </h1>
              <p className="animate-fade-3" style={{ color: theme.textMid, fontSize: '1.07rem', fontWeight: 300, lineHeight: 1.85, maxWidth: '580px', marginBottom: '20px' }}>
                {intro}
              </p>
              <div className="animate-fade-4" style={{
                color: theme.textDim, fontSize: '0.87rem', fontStyle: 'italic',
                maxWidth: '540px', padding: '14px 20px',
                background: theme.bgCard,
                borderTop:    `1px solid ${theme.border}`,
                borderRight:  `1px solid ${theme.border}`,
                borderBottom: `1px solid ${theme.border}`,
                borderLeft:   `3px solid #06B6D4`,
                borderRadius: '0 8px 8px 0',
                fontFamily: "'Space Mono', monospace",
                transition: 'background 0.4s',
              }}>
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
            <Section icon="⚈" title={t.section1Title} readMore={t.readMore} close={t.close} accentColor="#06B6D4" theme={theme}>
              <p style={{ color: theme.textMid, fontSize: '0.98rem', lineHeight: 1.9, marginBottom: '24px' }}>{t.section1Lead}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <Card title={t.card1Title} body={t.card1Body} accent="#06B6D4" theme={theme} />
                <Card title={t.card2Title} body={t.card2Body} accent="#8B5CF6" theme={theme} />
                <Card title={t.card3Title} body={t.card3Body} accent="#FF3366" theme={theme} />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', color: theme.textDim, textAlign: 'center', padding: '12px 18px', background: theme.bgCard, borderTop: `1px dashed ${theme.border}`, borderRight: `1px dashed ${theme.border}`, borderBottom: `1px dashed ${theme.border}`, borderLeft: `1px dashed ${theme.border}`, borderRadius: '6px' }}>
                {t.hint1}
              </p>
            </Section>

            {/* Section 2 */}
            <Section icon="▷" title={t.section2Title} readMore={t.readMore} close={t.close} accentColor="#FF3366" theme={theme}>
              <p style={{ color: theme.textMid, fontSize: '0.98rem', lineHeight: 1.9, marginBottom: '24px' }}>{t.section2Lead}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <Card title={t.card4Title} body={t.card4Body} accent="#FF3366" theme={theme} />
                <Card title={t.card5Title} body={t.card5Body} accent="#10B981" theme={theme} />
                <Card title={t.card6Title} body={t.card6Body} accent="#F59E0B" theme={theme} />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', color: theme.textDim, textAlign: 'center', padding: '12px 18px', background: theme.bgCard, borderTop: `1px dashed ${theme.border}`, borderRight: `1px dashed ${theme.border}`, borderBottom: `1px dashed ${theme.border}`, borderLeft: `1px dashed ${theme.border}`, borderRadius: '6px' }}>
                {t.hint2}
              </p>
            </Section>
          </div>

          {/* CTA */}
          <div style={{
            textAlign: 'center', padding: '50px 40px',
            background: theme.bgSection,
            borderTop: `1px solid ${theme.border}`,
            transition: 'background 0.4s',
          }}>
            <p style={{ color: theme.textMid, marginBottom: '28px', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 28px' }}>
              {t.ctaText}
            </p>
            <a href="https://source-two-beta.vercel.app/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 30px', borderRadius: '8px',
              fontFamily: "'Space Mono', monospace", fontSize: '0.82rem', letterSpacing: '0.1em',
              color: '#06B6D4',
              borderTop:    '1px solid #06B6D4',
              borderRight:  '1px solid #06B6D4',
              borderBottom: '1px solid #06B6D4',
              borderLeft:   '1px solid #06B6D4',
              textDecoration: 'none',
              boxShadow: '0 0 16px rgba(6,182,212,0.1)',
              transition: 'all 0.3s',
            }}>
              {t.ctaBtn} <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <footer style={{
        marginTop: '32px', textAlign: 'center',
        fontFamily: "'Space Mono', monospace",
        fontSize: '9px', color: theme.textDim,
        letterSpacing: '0.12em',
        position: 'relative', zIndex: 1,
      }}>
        {new Date().getFullYear()} — MJUKVARUUTVECKLARE — STOCKHOLM, SE
      </footer>
    </div>
  )
}