import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const MembershipPlan = ({ title, price, duration, popular, onSelect }: { 
  title: string, 
  price: string, 
  duration: string, 
  popular?: boolean,
  onSelect: () => void
}) => (
  <div style={{
    backgroundColor: popular ? 'var(--secondary)' : 'white',
    color: popular ? 'white' : 'var(--text-main)',
    padding: '3rem 2rem',
    borderRadius: '12px',
    boxShadow: popular ? '0 20px 25px -5px rgba(233, 98, 36, 0.2)' : 'var(--shadow)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transform: popular ? 'scale(1.05)' : 'none',
    zIndex: popular ? 1 : 0,
    border: popular ? '2px solid var(--primary)' : '1px solid #eee',
    transition: 'transform 0.3s ease'
  }}>
    {popular && (
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '0.4rem 1.2rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Best Value
      </div>
    )}
    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: popular ? 'white' : 'var(--black)', textTransform: 'uppercase' }}>{title}</h3>
    <div style={{ marginBottom: '2rem' }}>
      <span style={{ fontSize: '2.2rem', fontWeight: 800 }}>{price}</span>
      <span style={{ fontSize: '0.9rem', color: popular ? '#ccc' : '#666' }}> / {duration}</span>
    </div>
    <button 
      onClick={onSelect}
      className={popular ? 'btn-outline' : 'btn-outline'} 
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '0.9rem',
        fontWeight: 700,
        borderColor: popular ? 'white' : 'var(--secondary)',
        color: popular ? 'white' : 'var(--secondary)',
        backgroundColor: 'transparent',
        cursor: 'pointer'
      }}>
      Select Plan
    </button>
  </div>
);

const Membership = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleSelect = (plan: any) => {
    if (!user) {
      alert("Please log in to purchase a membership.");
      navigate('/login');
      return;
    }
    
    addToCart({
      id: plan.id,
      title: plan.title,
      price: plan.price,
      months: plan.months,
      duration: plan.duration
    });
    alert(`Added ${plan.title} Membership to your cart!`);
  };

  const plans = [
    { id: 'standard-1', title: "1 Month", price: "C$56.52", duration: "Month", months: 1 },
    { id: 'standard-3', title: "3 Months", price: "C$143.48", duration: "3 Months", popular: true, months: 3 },
    { id: 'standard-6', title: "6 Months", price: "C$273.17", duration: "6 Months", months: 6 },
    { id: 'standard-12', title: "1 Year", price: "C$430.43", duration: "Year", months: 12 }
  ];

  const studentSeniorPlans = [
    { id: 'student-1', title: "1 Month", price: "C$47.83", duration: "Month", months: 1 },
    { id: 'student-3', title: "3 Months", price: "C$134.78", duration: "3 Months", months: 3 },
    { id: 'student-6', title: "6 Months", price: "C$252.17", duration: "6 Months", months: 6 },
    { id: 'student-12', title: "1 Year", price: "C$404.35", duration: "Year", months: 12 }
  ];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    marginBottom: '5rem'
  };

  return (
    <div className="membership-page">
      <section style={{
        backgroundColor: 'var(--secondary)',
        color: 'white',
        padding: '120px 0 80px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ marginTop: '0' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>MEMBERSHIPS</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#aaa', fontSize: '1.1rem' }}>
            Choose the plan that fits your lifestyle and start your fitness journey today.
            Flexible options for every commitment level.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#fcfcfc' }}>
        <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
          <div style={{ ...gridStyle as any, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {plans.map((plan, i) => (
              <MembershipPlan key={i} {...plan} onSelect={() => handleSelect(plan)} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'var(--black)',
              marginBottom: '1rem'
            }}>
              Students & <span style={{ color: 'var(--primary)' }}>Seniors</span>
            </h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '0 auto' }}></div>
          </div>

          <div style={{ ...gridStyle as any, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {studentSeniorPlans.map((plan, i) => (
              <MembershipPlan key={i} {...plan} onSelect={() => handleSelect(plan)} />
            ))}
          </div>

          <div style={{
            padding: '4rem',
            backgroundColor: 'var(--white)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            borderLeft: '8px solid var(--primary)'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 800 }}>Important Information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>For New Members</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  After completing your membership purchase online, please visit us during our opening hours to complete your registration and pick up your access card (Key Fob).
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>Online Renewals</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Active members can renew online. Please note that it may take up to 24 hours for your access card (Key Fob) to be updated in our system after purchase.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>Eligibility</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Special discounted rates for students and seniors require a valid ID (Student ID or Government ID for 65+) to be presented upon your first visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1200px) {
          .container > div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .container > div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Membership;
