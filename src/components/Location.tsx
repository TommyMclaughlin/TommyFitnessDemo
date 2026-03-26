import { MapPin, Phone, Clock } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem'
      }}>
        <div className="contact-info">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem' }}>Find Us</h2>
          <p style={{ marginBottom: '2.5rem', color: '#ccc' }}>
            We're conveniently located in the heart of Bathurst. Join us today and start reaching your fitness potential.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px' }}><MapPin color="var(--primary)" /></div>
              <div>
                <p style={{ fontWeight: 700 }}>Our Location</p>
                <p style={{ color: '#ccc' }}>1234 main st, Bathurst, NB E2A 5A6</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px' }}><Phone color="var(--primary)" /></div>
              <div>
                <p style={{ fontWeight: 700 }}>Phone Number</p>
                <p style={{ color: '#ccc' }}>+1 123-456-7890</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px' }}><Clock color="var(--primary)" /></div>
              <div>
                <p style={{ fontWeight: 700 }}>Opening Hours</p>
                <p style={{ color: '#ccc' }}>Open 24/7 for Members</p>
              </div>
            </div>
          </div>
        </div>

        <div className="map-placeholder" style={{ backgroundColor: '#333', borderRadius: '12px', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          {/* In a real scenario, we'd embed Google Maps here */}
          <MapPin size={64} color="var(--primary)" />
          <p style={{ fontWeight: 600 }}>Interactive Map View</p>
          <a href="" target="_blank" rel="noreferrer" className="btn-outline" style={{ color: 'white', borderColor: 'white' }}>Get Directions</a>
        </div>
      </div>
    </section>
  );
};

export default Location;
