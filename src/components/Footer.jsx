import './footer.css'
export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer__top">
        <a href="mailto:hola@virastudio.com">Mail</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
      <p className="footer__mark">
        Vira Studio<sup>®</sup>
      </p>
      <div className="footer__bottom">
        <p> [  All rights reserved ]</p>
        <p>2026 Vira Studio</p>
      </div>
    </footer>
  )
}
