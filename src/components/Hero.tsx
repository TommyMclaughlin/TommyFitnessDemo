

import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const Hero = () => {
  return (
    <section id="home" className="section" style={{
      height: '90vh',
      minHeight: '600px',
      background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${hero})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: 'var(--white)',
      textAlign: 'center'
    }}>
      <div className="container fade-in">
        <h2 style={{
          fontSize: '1.25rem',
          letterSpacing: '0.3em',
          marginBottom: '1rem',
          color: 'var(--primary)'
        }}>
        </h2>
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          lineHeight: 1.1,
          marginBottom: '1.5rem'
        }}>
          TOMMY<br />
          <span style={{ WebkitTextStroke: '2px white', color: 'transparent' } as any}>FITNESS CENTER</span>
        </h1>
        <p style={{
          fontSize: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto 2.5rem',
          fontWeight: 500,
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Train Hard, Sweat Hard
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/signup" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>Start Your Journey</Link>
        </div>
      </div>
    </section >
  );
};

export default Hero;
