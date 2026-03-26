
import aboutGym from '../assets/about-gym.png';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        <div className="about-image" style={{
          position: 'relative',
          padding: '1rem'
        }}>
          <img
            src={aboutGym}
            alt="Tommy Fitness Gym"
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
              display: 'block'
            }}
          />

        </div>

        <div className="about-content">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your Local Hub for <span style={{ color: 'var(--primary)' }}>Fitness Excellence</span></h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Founded in 2024, Tommy Fitness Fitness Center Inc has quickly become the go-to local gym in Bathurst, NB. Our mission is to provide an inclusive atmosphere where fitness enthusiasts of all levels can thrive.
          </p>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Whether you are a professional athlete or just starting your journey, our facility is equipped with state-of-the-art machines and a team of experts dedicated to your well-being.
          </p>
          <ul style={{ marginBottom: '2.5rem' }}>
            {['Flexible Membership Plans', 'Certified Coaching', 'Clean & Safe Environment', 'Modern Equipment'].map(item => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.8rem',
                fontWeight: 600
              }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%' }}></div>
                {item}
              </li>
            ))}
          </ul>
          <a href="#location" className="btn-primary">Visit Us Today</a>
        </div>
      </div>
    </section>
  );
};

export default About;
