import { useState } from 'react'
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

const HALF = Math.floor(STEPS.length / 2)

export default function HowWeWork() {
  const [active, setActive] = useState(0)

  const next = () => setActive((c) => (c + 1) % STEPS.length)
  const previous = () =>
    setActive((c) => (c - 1 + STEPS.length) % STEPS.length)

  return (
    <section className="how" id="como-trabajamos" data-flow-section>
      <div className="how__header">
        <div>
          <span className="how__eyebrow">nuestro proceso</span>
          <h2 data-flow-item="1">Cómo trabajamos</h2>
        </div>

        <p data-flow-item="2">
          Cada proyecto tiene su propio camino. Nosotros nos encargamos de
          convertir las ideas en experiencias digitales con intención.
        </p>
      </div>

      <div className="how__cards">
        {STEPS.map((step, index) => {
          // -2 … 0 … +2: la carta activa queda en el centro del abanico
          const offset =
            ((index - active + HALF + STEPS.length) % STEPS.length) - HALF
          // 0 … n-1: lo usa el mazo en mobile
          const position = (index - active + STEPS.length) % STEPS.length

          return (
            <article
              key={step.number}
              className={`how-card ${offset === 0 ? 'is-active' : ''}`}
              data-offset={offset}
              style={{ '--offset': offset, '--position': position }}
              onClick={() => setActive(index)}
            >
              <div className="how-card__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>

              <div className="how-card__cta">
                <span>{step.number}</span>
                <span className="how-card__arrow">→</span>
              </div>
            </article>
          )
        })}
      </div>

      <div className="how__controls">
        <button type="button" onClick={previous} aria-label="Proceso anterior">
          ←
        </button>

        <span>
          {String(active + 1).padStart(2, '0')} /{' '}
          {String(STEPS.length).padStart(2, '0')}
        </span>

        <button type="button" onClick={next} aria-label="Siguiente proceso">
          →
        </button>
      </div>
    </section>
  )
}