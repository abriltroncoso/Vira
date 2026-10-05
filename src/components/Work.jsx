const PROJECTS = [
  { year: '2026', client: 'Northline', type: 'Marca + web', tone: 'Editorial oscuro' },
  { year: '2025', client: 'Kite Market', type: 'E-commerce', tone: 'Retail vivo' },
  { year: '2025', client: 'Atelier 9', type: 'Identidad', tone: 'Serif y silencio' },
  { year: '2024', client: 'Pulse Lab', type: 'Producto', tone: 'Sistema denso' },
]

export default function Work() {
  return (
    <section className="section section--tight" id="trabajo">
      <div className="section__head">
        <p className="eyebrow">Selección</p>
        <h2>Trabajo reciente.</h2>
      </div>
      <ol className="work">
        {PROJECTS.map((project, index) => (
          <li key={project.client} className="work__row">
            <span className="work__index">0{index + 1}</span>
            <h3>{project.client}</h3>
            <p>{project.type}</p>
            <p className="work__tone">{project.tone}</p>
            <span className="work__year">{project.year}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
