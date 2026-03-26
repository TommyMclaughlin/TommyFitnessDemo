import { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2, User as UserIcon, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const Account = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p>Please log in to view your account details.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post('/api/auth/change-password', {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });
      setSuccess("Password changed successfully!");
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      const msg = err.response?.data?.Errors?.[0] || err.response?.data?.Message || "Failed to change password. Please check your current password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--black)' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and security</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        {/* Profile Info Sidebar */}
        <div>
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: 'var(--shadow)',
            border: '1px solid #eee'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(233, 98, 36, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <UserIcon size={40} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>{user.name || 'User'}</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Member since 2024</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <Mail size={16} color="var(--text-muted)" />
                <span>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <ShieldCheck size={16} color="#34A853" />
                <span style={{ color: '#34A853', fontWeight: 600 }}>Account Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Form */}
        <div>
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: 'var(--shadow)',
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <Lock size={20} color="var(--primary)" />
              </div>
              <h2 style={{ fontSize: '1.25rem' }}>Change Password</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && (
                <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fff5f5', color: '#dc3545', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #ffe3e3' }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f6ffed', color: '#34A853', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #b7eb8f' }}>
                  {success}
                </div>
              )}

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Current Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    placeholder="Enter current password"
                    style={{ width: '100%', padding: '12px 1rem', paddingRight: '2.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    placeholder="At least 6 characters"
                    style={{ width: '100%', padding: '12px 1rem', paddingRight: '2.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat new password"
                  style={{ width: '100%', padding: '12px 1rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ marginTop: '1rem', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
