import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { ShoppingBag, Calendar, CreditCard, ChevronLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  planTitle: string;
  amount: number;
  months: number;
  createdAt: string;
  status: string;
}

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/api/Orders/history');
      return response.data as Order[];
    }
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 0 80px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-muted)', 
            marginBottom: '2rem',
            fontWeight: 600
          }}>
            <ChevronLeft size={18} />
            Back to Home
          </Link>

          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.5rem' }}>Order History</h1>
            <p style={{ color: 'var(--text-muted)' }}>Review your past membership purchases and transactions.</p>
          </header>

          {!orders || orders.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '5rem 2rem', 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              boxShadow: 'var(--shadow)' 
            }}>
              <ShoppingBag size={64} color="#ddd" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>No orders found</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't purchased any memberships yet.</p>
              <Link to="/membership-online-store" className="btn-primary" style={{ padding: '12px 30px' }}>
                View Memberships
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {orders.map((order) => (
                <div key={order.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #efefef',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: '2rem'
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(233, 98, 36, 0.1)', 
                    padding: '1rem', 
                    borderRadius: '16px' 
                  }}>
                    <Package size={28} color="var(--primary)" />
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{order.planTitle}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={14} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CreditCard size={14} />
                        {order.months} Months Access
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                      C${order.amount.toFixed(2)}
                    </div>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase', 
                      backgroundColor: '#dcfce7', 
                      color: '#15803d',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
