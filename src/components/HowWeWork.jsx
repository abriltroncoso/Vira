import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import './how-we-work.css'

const STEPS = [
  {
    number: '01',
    title: 'Nos conocemos',
    text: 'Empezamos entendiendo tu marca, tus objetivos y qué querés construir. Antes de diseñar, escuchamos.',
  },
  {
    number: '02',
    title: 'Pensamos',
    text: 'Ordenamos las ideas y definimos una dirección clara. Estrategia, concepto y una mirada que tenga sentido para tu proyecto.',
  },
  {
    number: '03',
    title: 'Diseñamos',
    text: 'Convertimos esa dirección en una identidad visual y una experiencia digital coherente, funcional y con personalidad.',
  },
  {
    number: '04',
    title: 'Desarrollamos',
    text: 'Llevamos el diseño a la realidad. Construimos experiencias digitales que funcionan y se sienten como tu marca.',
  },
  {
    number: '05',
    title: 'Lanzamos',
    text: 'Revisamos cada detalle, hacemos los últimos ajustes y dejamos todo listo para salir al mundo.',
  },
]

/* Detecta desktop (abanico) vs mobile (pila) */
function useIsDesktop(query = '(min-width: 860px)') {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/* MOBILE: pila con scroll */
function StackCard({ step, index, total, progress }) {
  const reduceMotion = useReducedMotion()

  const targetScale = 1 - (total - index - 1) * 0.06
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, reduceMotion ? 1 : targetScale]
  )

  return (
    <div className="how-card-wrap">
      <motion.article
        className="how-card"
        style={{
          scale,
          top: `calc(-4vh + ${index * 26}px)`,
        }}
      >
        <div className="how-card__body">
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>

        <div className="how-card__cta">
          <span>{step.number}</span>
          <span className="how-card__arrow">→</span>
        </div>
      </motion.article>
    </div>
  )
}

/* DESKTOP: abanico */
function FanCard({ step, index, total }) {
  const offset = index - (total - 1) / 2

  return (
    <div
      className="how-card-wrap"
      style={{
        '--rot': `${offset * 5}deg`,
        '--y': `${Math.pow(Math.abs(offset), 2) * 14}px`,
        zIndex: index + 1,
      }}
    >
      <article className="how-card how-card--fan" tabIndex={0}>
        <div className="how-card__body">
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>

        <div className="how-card__cta">
          <span>{step.number}</span>
          <span className="how-card__arrow">→</span>
        </div>
      </article>
    </div>
  )
}

export default function HowWeWork() {
  const stackRef = useRef(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="how" id="como-trabajamos">
      <div className="how__header" data-flow-section>
        <div>
          <span className="how__eyebrow">nuestro proceso</span>
          <h2 data-flow-item="1">Cómo trabajamos</h2>
        </div>

        <p data-flow-item="2">
          Cada proyecto tiene su propio camino. Nosotros nos encargamos de
          convertir las ideas en experiencias digitales con intención.
        </p>
      </div>

      <div
        className={`how__stack ${isDesktop ? 'how__stack--fan' : ''}`}
        ref={stackRef}
      >
        {STEPS.map((step, i) =>
          isDesktop ? (
            <FanCard
              key={step.number}
              step={step}
              index={i}
              total={STEPS.length}
            />
          ) : (
            <StackCard
              key={step.number}
              step={step}
              index={i}
              total={STEPS.length}
              progress={scrollYProgress}
            />
          )
        )}
      </div>
    </section>
  )
}