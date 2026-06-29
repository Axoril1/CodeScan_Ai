import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiPanda } from 'react-icons/gi';
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkStyle = (path) => ({
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: 800,
    letterSpacing: '1px',
    padding: '6px 16px',
    border: '1px solid',
    borderColor: location.pathname === path ? '#c8860a' : 'rgba(200,134,10,0.3)',
    borderRadius: '4px',
    background: location.pathname === path ? 'rgba(200,134,10,0.15)' : 'transparent',
    color: location.pathname === path ? '#ffe066' : '#c8860a',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  });

  return (
    <nav style={{
      background: 'linear-gradient(180deg, #2d1200 0%, #1a0a00 100%)',
      borderBottom: '2px solid #c8860a',
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 20px rgba(200,134,10,0.2)',
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <GiPanda size={32} color="#ffe066" />
        <div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', fontWeight: 900, color: '#ffe066', letterSpacing: '2px', lineHeight: 1, textShadow: '0 0 10px rgba(255,200,50,0.4)' }}>
            CODESCAN
          </h1>
          <p style={{ fontSize: '0.55rem', color: '#c8860a', fontWeight: 800, letterSpacing: '2px', lineHeight: 1, marginTop: '2px' }}>
            THE DRAGON WARRIOR CODE REVIEWER
          </p>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle('/')}>
          <FaHome size={13} /> HOME
        </Link>
        {user && (
          <Link to="/history" style={linkStyle('/history')}>
            <FaHistory size={13} /> HISTORY
          </Link>
        )}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #c8860a' }}
            />
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#c8860a',
                border: '1px solid rgba(200,134,10,0.4)',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <FaSignOutAlt size={12} /> LOGOUT
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '6px 16px',
            border: '1px solid #c8860a',
            borderRadius: '4px',
            background: 'rgba(200,134,10,0.15)',
            color: '#ffe066',
            marginLeft: '8px',
          }}>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
