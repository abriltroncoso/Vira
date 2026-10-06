import { useEffect, useRef, useState } from 'react'
import './services.css'

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
   TEXTO QUE SE OSCURECE CON EL SCROLL
   ========================================================= */

function ScrollText({ children }) {
  const containerRef = useRef(null)

  const words = children.trim().split(/\s+/)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const updateWords = () => {
      const wordElements =
        container.querySelectorAll('.scroll-word')

      const viewportHeight = window.innerHeight

      /*
        Zona donde empieza a oscurecerse
      */
      const start = viewportHeight * 0.82

      /*
        Zona donde la palabra ya está completamente oscura
      */
      const end = viewportHeight * 0.42

      wordElements.forEach((word) => {
        const rect = word.getBoundingClientRect()

        const center = rect.top + rect.height / 2

        let progress =
          (start - center) / (start - end)

        progress = Math.max(
          0,
          Math.min(1, progress)
        )

        /*
          Gris claro → negro
        */
        const light = Math.round(165 - 125 * progress)

        word.style.color = `rgb(${light}, ${light}, ${light})`
      })
    }

    updateWords()

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateWords()
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      updateWords
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )

      window.removeEventListener(
        'resize',
        updateWords
      )
    }
  }, [])

  return (
    <p
      ref={containerRef}
      className="services__scroll-text"
    >
      {words.map((word, index) => (
        <span
          className="scroll-word"
          key={`${word}-${index}`}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  )
}


/* =========================================================
   SERVICES
   ========================================================= */

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section
      className="services"
      id="servicios"
      data-flow-section
    >

      <div className="services__intro">

        <h2 data-flow-item="1">
          Nuestros servicios
        </h2>

        <ScrollText>
          Diseñamos marcas que se sienten vivas, webs que funcionan y contenido que conecta. Combinamos estrategia, diseño y tecnología para construir experiencias digitales con identidad, coherencia y una mirada contemporánea para hacer crecer cada proyecto.
        </ScrollText>

        <a
          className="btn"
          href="mailto:somovira.studio@gmail.com?subject=Quiero%20trabajar%20con%20Vira%20Studio&body=Hola%20Vira%20Studio,%0A%0AMe%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios."
          data-flow-item="3"
        >
          <span className="btn__track">
            <span className="btn__text">
              Contactanos
            </span>
          </span>
        </a>

      </div>


      <ul
        className={`services__list ${
          active !== null ? 'has-active' : ''
        }`}
      >

        {ITEMS.map((item, index) => (

          <li
            key={item.title}
            className="service-item"
            data-flow-item={index + 1}
            style={{
              '--item-index': index,
            }}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >

            <span className="services__number">
              0{index + 1}
            </span>

            <div className="services__content">

              <span className="services__name">
                {item.title}
              </span>

              <div className="services__description">
                {item.description}
              </div>

            </div>

            <span
              className="services__chevron"
              aria-hidden="true"
            >
              ↗
            </span>

          </li>

        ))}

      </ul>

    </section>
  )
}