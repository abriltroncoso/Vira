import { useState } from 'react'
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

        <p data-flow-item="2">
          Diseñamos marcas que se sienten vivas, webs que funcionan y contenido
          que conecta. Combinamos estrategia, diseño y tecnología para construir
          experiencias digitales con identidad, coherencia y una mirada
          contemporánea para hacer crecer cada proyecto.
        </p>

        <a
          className="btn"
          href="somovira.studio@gmail.com"
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