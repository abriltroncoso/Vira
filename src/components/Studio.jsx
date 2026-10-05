import './studio.css'
function Polaroid({ name, className }) {
  return (
    <figure className={`polaroid ${className}`}>
      <span className="polaroid__pin" aria-hidden="true" />
      <div className="polaroid__photo" />
      <figcaption>{name}</figcaption>
    </figure>
  )
}

export default function Studio() {
  return (
    <section
    className="studio"
    id="studio"
    data-flow-section
  >
      <div className="studio__photos" aria-hidden="true" data-flow-item="1">
        <Polaroid name="Victoria" className="polaroid--victoria" />
        <Polaroid name="Abril" className="polaroid--abril" />
      </div>
      <div className="studio__copy">
        <h2 data-flow-item="2">Quienes somos</h2>
        <p data-flow-item="3">
          Diseño y desarrollo, en un mismo lugar. En Vira unimos nuestras
          miradas para crear experiencias digitales con identidad y sentido.
        </p>
        <p data-flow-item="4">
          Abril se especializa en desarrollo web/mobile y Victoria en diseño
          digital. Esa combinación nos permite pensar cada proyecto de forma
          completa, desde lo visual hasta lo funcional.
        </p>
      </div>
    </section>
  )
}
