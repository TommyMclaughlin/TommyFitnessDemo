import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/MainLogo.png';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div className="footer-brand">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '1.5rem'
            }}>
              <img src={logo} alt="Logo" style={{ maxHeight: '40px', backgroundColor: 'white' }} />

            </div>
            <p style={{ color: '#888', maxWidth: '300px' }}>
              Proudly serving Bathurst, NB with the best fitness experience since 2024.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#888' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/membership-online-store">Memberships</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#features">Services</Link></li>
              <li><Link to="/#location">Location</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Social Media</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#888' }}><Facebook /></a>
              <a href="#" style={{ color: '#888' }}><Instagram /></a>
              <a href="#" style={{ color: '#888' }}><Twitter /></a>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Membership</h4>
            <p style={{ color: '#888', marginBottom: '1rem' }}>Questions about joining?</p>
            <a href="" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>Call Us Now</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', textAlign: 'center', color: '#555', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Tommy Fitness Fitness Center Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
