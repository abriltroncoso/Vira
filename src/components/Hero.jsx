import './Hero.css';

const text = 'diseño y desarrollo digital';

export default function Hero() {
  return (
    <section className="hero" data-flow-section>
      <p className="eyebrow">
        {text.toUpperCase().split('').map((letter, index) => (
          <span
            className="eyebrow__letter"
            key={index}
            style={{ '--i': index }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </p>

      <h1>
        Vira Studio.
        <sup>®</sup>
      </h1>
    </section>
  );
}