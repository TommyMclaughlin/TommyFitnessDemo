import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CreditCard, ArrowLeft, CheckCircle, ShieldCheck, Zap, Lock, Trash2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { api } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // PLACEHOLDER: Replace this with your actual Ecwid Store ID
  const ECWID_STORE_ID = '';

  useEffect(() => {
    // If cart is empty, redirect back to membership
    if (cart.length === 0 && !isProcessing) {
      navigate('/membership-online-store');
      return;
    }

    if (ECWID_STORE_ID) {
      const script = document.createElement('script');
      script.src = `https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code&data_bundle=wix`;
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;

      script.onload = () => {
        // @ts-ignore
        if (window.Ecwid) {
          // @ts-ignore
          window.Ecwid.OnOrderPlaced(async (order) => {
            try {
              setIsProcessing(true);
              // Prepare items for backend
              const orderItems = cart.map(item => ({
                title: item.title,
                amount: parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0,
                months: item.months
              }));

              await api.post('/api/Auth/updateExpiration', { items: orderItems });
              
              const totalMonths = cart.reduce((sum, item) => sum + item.months, 0);
              clearCart();
              alert(`Success! Your membership has been extended by ${totalMonths} months.`);
              navigate('/');
            } catch (err: any) {
              console.error("Failed to update expiration:", err);
              alert(`Error ${err.response?.status || 'Unknown'}: Failed to update account.`);
            } finally {
              setIsProcessing(false);
            }
          });
        }
      };

      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [cart, navigate, ECWID_STORE_ID, clearCart]);

  if (cart.length === 0) return null;

  return (
    <div className="checkout-page" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '120px 0 80px'
    }}>
      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link to="/membership-online-store" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'color 0.2s ease'
          }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={18} />
            Back to Plans
          </Link>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {/* Order Summary */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <ShoppingBag size={24} color="var(--primary)" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>ORDER SUMMARY</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    borderLeft: '4px solid var(--primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.25rem' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle size={14} color="var(--primary)" /> {item.duration} Access
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {item.price}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '5px' }}
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #efefef', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>C${totalPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666' }}>Processing Fee</span>
                  <span style={{ color: '#27ae60', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem', fontWeight: 900, fontSize: '1.5rem', color: 'var(--black)' }}>
                  <span>Total</span>
                  <span>C${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#444', fontSize: '0.9rem' }}>
                  <div style={{ backgroundColor: '#e8f5e9', padding: '8px', borderRadius: '50%' }}>
                    <CheckCircle size={18} color="#2e7d32" />
                  </div>
                  <span>Instant gym access upon registration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#444', fontSize: '0.9rem' }}>
                  <div style={{ backgroundColor: '#fff3e0', padding: '8px', borderRadius: '50%' }}>
                    <ShieldCheck size={18} color="var(--primary)" />
                  </div>
                  <span>100% Secure SSL encrypted transaction</span>
                </div>
                {user && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#444', fontSize: '0.9rem' }}>
                    <div style={{ backgroundColor: '#e3f2fd', padding: '8px', borderRadius: '50%' }}>
                      <Zap size={18} color="#1976d2" />
                    </div>
                    <span>Linked to {user.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Section */}
            <div style={{
              backgroundColor: 'var(--secondary)',
              padding: '3rem',
              borderRadius: '24px',
              color: 'white',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '500px'
            }}>
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle at 80% 20%, rgba(233, 98, 36, 0.1) 0%, transparent 40%)',
                zIndex: 0,
                pointerEvents: 'none'
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ backgroundColor: 'rgba(233, 98, 36, 0.2)', padding: '10px', borderRadius: '12px' }}>
                    <CreditCard size={28} color="var(--primary)" />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>Payment</h2>
                </div>

                <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                  Complete your membership purchase through our secure Ecwid payment gateway. We accept all major credit cards and digital wallets.
                </p>

                {/* ECWID Integration Area */}
                <div id="ecwid-checkout-container" style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {ECWID_STORE_ID ? (
                    <div style={{ color: '#888' }}>Initializing secure payment module...</div>
                  ) : (
                    <>
                      <Lock size={48} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)', fontWeight: 700 }}>Ecwid Store Ready</h3>
                      <p style={{ fontSize: '0.9rem', color: '#888', maxWidth: '250px', margin: '0 auto 2rem' }}>
                        Your payment gateway is ready for configuration. Please provide your Ecwid Store ID to enable live processing.
                      </p>
                      <button
                        disabled
                        className="btn-primary"
                        style={{
                          width: '100%',
                          backgroundColor: '#ccc',
                          color: 'white',
                          padding: '18px',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          fontWeight: 700,
                          cursor: 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.8rem'
                        }}
                      >
                        Payment ID Required
                        <ArrowLeft size={18} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
                      </button>
                    </>
                  )}
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', opacity: 0.5, marginBottom: '1.5rem' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '12px' }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '18px' }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{ height: '18px' }} />
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>
                    Payments are processed securely. Your data is protected by industry-standard encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          animation: pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          filter: brightness(1.1);
        }
        .btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Checkout;
