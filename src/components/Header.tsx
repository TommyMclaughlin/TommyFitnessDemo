import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, LogOut, User as UserIcon, History, Settings, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import logo from '../assets/MainLogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#fff',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          animation: 'slideIn 0.3s ease-out',
          overflowY: 'auto'
        }}>
          {/* Menu Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <img src={logo} alt="Logo" style={{ maxHeight: '60px' }} />
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{ color: 'var(--black)', padding: '8px' }}
            >
              <X size={32} />
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Home</Link>
            <Link to="/#about" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>About</Link>
            <Link to="/#services" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Services</Link>
            <Link to="/#location" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Location</Link>
            <Link to="/membership-online-store" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Membership</Link>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee', margin: '2rem 0' }}></div>

          {/* Auth Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {user ? (
              <>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} style={mobileAuthLinkStyle}>
                  <History size={22} /> Order History
                </Link>
                <Link to="/account" onClick={() => setIsMenuOpen(false)} style={mobileAuthLinkStyle}>
                  <Settings size={22} /> Account Details
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{ ...mobileAuthLinkStyle, color: '#dc3545', cursor: 'pointer' }}
                >
                  <LogOut size={22} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  style={{ 
                    ...mobileAuthLinkStyle, 
                    justifyContent: 'center', 
                    backgroundColor: '#f8f9fa', 
                    padding: '16px', 
                    borderRadius: '12px' 
                  }}
                >
                  LOG IN
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="btn-primary" 
                  style={{ textAlign: 'center', padding: '18px', borderRadius: '12px', fontSize: '1.1rem' }}
                >
                  JOIN NOW
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'var(--shadow)',
      padding: '1rem 0'
    } as any}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--black)',
          textTransform: 'uppercase'
        }}>
          <img src={logo} alt="Logo" style={{ maxHeight: '100px' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
          <Link
            to="/"
            style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
          >
            Home
          </Link>
          {['About', 'Services', 'Location'].map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              style={{
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-main)'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/membership-online-store"
            style={{
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-main)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
          >
            Membership
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Desktop Auth/Cart - Hidden on Mobile */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {user ? (
              <>
                <Link 
                  to="/checkout" 
                  style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'var(--text-main)',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-10px',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white'
                    }}>
                      {cartCount}
                    </span>
                  )}
                  <span style={{ marginLeft: '0.6rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Cart</span>
                </Link>
                
                <div style={{ width: '1px', height: '24px', backgroundColor: '#eee' }}></div>
                
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      color: isDropdownOpen ? 'var(--primary)' : 'var(--text-main)',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      backgroundColor: isDropdownOpen ? 'rgba(233, 98, 36, 0.1)' : 'rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    <UserIcon size={16} />
                    <span>{user?.name || user?.email?.split('@')[0]}</span>
                    <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>

                  {isDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      width: '200px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                      padding: '0.5rem',
                      border: '1px solid #eee',
                      zIndex: 1001
                    }}>
                      <Link to="/orders" onClick={() => setIsDropdownOpen(false)} style={dropdownItemStyle} onMouseOver={h_over} onMouseOut={h_out}><History size={16} />Order History</Link>
                      <Link to="/account" onClick={() => setIsDropdownOpen(false)} style={dropdownItemStyle} onMouseOver={h_over} onMouseOut={h_out}><Settings size={16} />Account Details</Link>
                      <div style={{ height: '1px', backgroundColor: '#eee', margin: '0.5rem' }}></div>
                      <button onClick={handleLogout} style={logoutButtonStyle} onMouseOver={l_over} onMouseOut={l_out}><LogOut size={16} />Log Out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-main)' }}>Log in</Link>
                <Link to="/signup" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem', borderRadius: '8px' }}>Join Now</Link>
              </>
            )}
          </div>

          {/* Cart Icon - Always visible on mobile if logged in */}
          {user && (
            <Link to="/checkout" className="mobile-only-flex" style={{ position: 'relative', display: 'none', color: 'var(--black)' }}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.6rem', fontWeight: 800, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              display: 'none', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--black)',
              padding: '8px'
            }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          animation: 'slideIn 0.3s ease-out',
          overflowY: 'auto'
        }}>
          {/* Menu Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <img src={logo} alt="Logo" style={{ maxHeight: '60px' }} />
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{ color: 'var(--black)', padding: '8px' }}
            >
              <X size={32} />
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Home</Link>
            <Link to="/#about" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>About</Link>
            <Link to="/#services" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Services</Link>
            <Link to="/#location" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Location</Link>
            <Link to="/membership-online-store" onClick={() => setIsMenuOpen(false)} style={mobileLinkStyle}>Membership</Link>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee', margin: '2rem 0' }}></div>

          {/* Auth Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {user ? (
              <>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} style={mobileAuthLinkStyle}>
                  <History size={22} /> Order History
                </Link>
                <Link to="/account" onClick={() => setIsMenuOpen(false)} style={mobileAuthLinkStyle}>
                  <Settings size={22} /> Account Details
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{ ...mobileAuthLinkStyle, color: '#dc3545', cursor: 'pointer' }}
                >
                  <LogOut size={22} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  style={{ 
                    ...mobileAuthLinkStyle, 
                    justifyContent: 'center', 
                    backgroundColor: '#f8f9fa', 
                    padding: '16px', 
                    borderRadius: '12px' 
                  }}
                >
                  LOG IN
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="btn-primary" 
                  style={{ textAlign: 'center', padding: '18px', borderRadius: '12px', fontSize: '1.1rem' }}
                >
                  JOIN NOW
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-toggle { 
            display: flex !important; 
            align-items: center;
            justify-content: center;
            padding: 8px;
          }
          .mobile-only-flex { display: flex !important; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
    </>
  );
};

// Simplified Helpers
const mobileLinkStyle: any = { fontWeight: 800, fontSize: '1.3rem', color: '#000', textTransform: 'uppercase', letterSpacing: '0.02em', textDecoration: 'none' };
const mobileAuthLinkStyle: any = { display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem', color: '#262626', textDecoration: 'none' };
const dropdownItemStyle: any = { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' };
const logoutButtonStyle: any = { width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', color: '#dc3545', border: 'none', backgroundColor: 'transparent', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' };
const h_over = (e: any) => e.currentTarget.style.backgroundColor = '#f8f9fa';
const h_out = (e: any) => e.currentTarget.style.backgroundColor = 'transparent';
const l_over = (e: any) => e.currentTarget.style.backgroundColor = '#fff5f5';
const l_out = (e: any) => e.currentTarget.style.backgroundColor = 'transparent';

export default Header;
