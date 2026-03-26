
import { Clock, Trophy, Users, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div style={{
    backgroundColor: 'var(--white)',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    textAlign: 'center',
    transition: 'var(--transition)',
    cursor: 'default'
  }}
    className="feature-card"
  >
    <div style={{
      backgroundColor: 'rgba(237, 28, 36, 0.1)',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      color: 'var(--primary)'
    }}>
      <Icon size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{description}</p>

    <style>{`
      .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-lg);
        border-bottom: 4px solid var(--primary);
      }
    `}</style>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "5am - 10pm Access",
      description: "Our members with access cards, our doors are now open every day, from 5 am to 10 pm"
    },
    {
      icon: Trophy,
      title: "Top Equipment",
      description: "Modern weights, cardio machines, and functional training gear to help you reach your goals."
    },
    {
      icon: Users,
      title: "Expert Coaching",
      description: "Our certified personal trainers are here to guide you with tailored programs and nutritional advice."
    },
    {
      icon: Zap,
      title: "Great Community",
      description: "Join a supportive and motivating environment where everyone works towards a healthier lifestyle."
    }
  ];

  return (
    <section id="services" className="section" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--black)' }}>Why Tommy Fitness?</h2>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: 'var(--primary)',
            margin: '1.5rem auto'
          }}></div>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
            We provide everything you need to transform your fitness journey into a sustainable lifestyle.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

export default Features;
