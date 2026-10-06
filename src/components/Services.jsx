import { Fragment, useEffect, useRef, useState } from 'react'
import './services.css'

/* Cambiá esto por el destino real del botón (sección, mailto, etc.) */
const CONTACT_HREF = "mailto:somosvira.studio@gmail.com?subject=Consulta%20de%20trabajo&body=Hola%20Vira!%20Me%20interesar%C3%ADa%20trabajar%20con%20ustedes"

const ITEMS = [
  {
    title: 'Diseño & gestión de redes sociales',
    description:
      'Creamos contenido estratégico y una comunicación coherente para que tu marca tenga presencia y conecte con su audiencia.',
  },
  {
    title: 'Diseño - desarrollo web & mobile',
    description:
      'Diseñamos y desarrollamos sitios web y experiencias mobile funcionales, atractivas y pensadas para convertir.',
  },
  {
    title: 'E-commerce - tienda online',
    description:
      'Creamos tiendas online simples, claras y estratégicas para que tus productos se vean bien y vender sea más fácil.',
  },
  {
    title: 'Branding',
    description:
      'Construimos identidades visuales con personalidad, desde el concepto y el logo hasta el sistema gráfico de tu marca.',
  },
]

/* =========================================================
   TÍTULO QUE SE "PINTA" DE NEGRO CON EL SCROLL
   Gris opaco → negro, letra por letra, de izquierda a derecha
   ========================================================= */

const clamp = (value) => Math.max(0, Math.min(1, value))

function ScrollHeading({ children, ...props }) {
  const ref = useRef(null)

  const text = children.trim()
  const words = text.split(/\s+/)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = el.querySelectorAll('.scroll-char')
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const FROM = 178 // gris opaco
    const TO = 17 // casi negro
    const SOFTNESS = 4 // cuántas letras tiene el "degradé" del barrido

    const paint = () => {
      let progress = 1

      if (!reduceMotion) {
        const vh = window.innerHeight
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2

        // Empieza a pintarse cuando el título está al 88% de la pantalla
        // y termina cuando llega al 50%
        const start = vh * 0.88
        const end = vh * 0.5

        progress = clamp((start - center) / (start - end))
      }

      const sweep = progress * (chars.length + SOFTNESS)

      chars.forEach((char, i) => {
        const p = clamp((sweep - i) / SOFTNESS)
        const value = Math.round(FROM + (TO - FROM) * p)
        char.style.color = `rgb(${value}, ${value}, ${value})`
      })
    }

    paint()

    if (reduceMotion) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        paint()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', paint)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', paint)
    }
  }, [])

  return (
    <h2 ref={ref} aria-label={text} {...props}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            {wordIndex > 0 && ' '}
            <span className="scroll-word">
              {[...word].map((char, charIndex) => (
                <span className="scroll-char" key={charIndex}>
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </h2>
  )
}

/* =========================================================
   SERVICES
   ========================================================= */

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section className="services" id="servicios" data-flow-section>
      <ScrollHeading data-flow-item="1">Nuestros servicios</ScrollHeading>

      <ul
        className={`services__list ${active !== null ? 'has-active' : ''}`}
      >
        {ITEMS.map((item, index) => {
          const isActive = active === index

          return (
            <li
              key={item.title}
              className={`service-item ${isActive ? 'is-active' : ''}`}
              data-flow-item={index + 1}
              style={{ '--item-index': index }}
              tabIndex={0}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={(e) => {
                // Si el foco pasa al botón de adentro, no cerramos
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setActive(null)
                }
              }}
            >
              <span className="services__number">0{index + 1}</span>

              <span className="services__name">{item.title}</span>

              <span className="services__chevron" aria-hidden="true">
                ↗
              </span>

              <div className="services__reveal">
                <div className="services__reveal-inner">
                  <div className="services__reveal-content">
                    <p className="services__description">
                      {item.description}
                    </p>

                    <a className="services__cta" href={CONTACT_HREF}>
                      Contactanos
                    </a>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}