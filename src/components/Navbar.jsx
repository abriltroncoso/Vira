import './navBar.css'
const LINKS = [
  { href: '#estudio', label: 'Sobre nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contactanos' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <a className="nav__logo" href="#inicio">
        ViraStudio
      </a>
      <nav className="nav__links" aria-label="Secciones">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
