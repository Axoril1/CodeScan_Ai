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
    fontSize: '0.8rem',
    fontWeight: 800,
    letterSpacing: '1px',
    padding: '6px 12px',
    border: '1px solid',
    borderColor: location.pathname === path ? '#c8860a' : 'rgba(200,134,10,0.3)',
    borderRadius: '4px',
    background: location.pathname === path ? 'rgba(200,134,10,0.15)' : 'transparent',
    color: location.pathname === path ? '#ffe066' : '#c8860a',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
  });

  return (
    <nav className="navbar" style={{
      background: 'linear-gradient(180deg, #2d1200 0%, #1a0a00 100%)',
      borderBottom: '2px solid #c8860a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 20px rgba(200,134,10,0.2)',
      overflow: 'hidden',
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <GiPanda size={28} color="#ffe066" style={{ flexShrink: 0 }} />
        <div className="navbar-text-group" style={{ minWidth: 0 }}>
          <h1 className="navbar-title" style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, color: '#ffe066', letterSpacing: '1px', lineHeight: 1, textShadow: '0 0 10px rgba(255,200,50,0.4)', whiteSpace: 'nowrap' }}>
            CODESCAN
          </h1>
          <p className="navbar-subtitle" style={{ fontSize: '0.55rem', color: '#c8860a', fontWeight: 800, letterSpacing: '1.5px', lineHeight: 1, marginTop: '2px', whiteSpace: 'nowrap' }}>
            THE DRAGON WARRIOR CODE REVIEWER
          </p>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
        <Link to="/" style={linkStyle('/')}>
          <FaHome size={12} /> <span className="nav-links"><span>HOME</span></span>
        </Link>
        {user && (
          <Link to="/history" style={linkStyle('/history')}>
            <FaHistory size={12} /> <span className="nav-links"><span>HISTORY</span></span>
          </Link>
        )}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #c8860a', flexShrink: 0 }}
            />
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#c8860a',
                border: '1px solid rgba(200,134,10,0.4)',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <FaSignOutAlt size={11} /> <span className="nav-links">LOGOUT</span>
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '6px 14px',
            border: '1px solid #c8860a',
            borderRadius: '4px',
            background: 'rgba(200,134,10,0.15)',
            color: '#ffe066',
            marginLeft: '4px',
            whiteSpace: 'nowrap',
          }}>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
