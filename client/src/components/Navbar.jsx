import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

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
        <span style={{ fontSize: '1.8rem' }}>🐼</span>
        <div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', fontWeight: 900, color: '#ffe066', letterSpacing: '2px', lineHeight: 1, textShadow: '0 0 10px rgba(255,200,50,0.4)' }}>
            CODESCAN
          </h1>
          <p style={{ fontSize: '0.55rem', color: '#c8860a', fontWeight: 800, letterSpacing: '2px', lineHeight: 1, marginTop: '2px' }}>
            THE DRAGON WARRIOR CODE REVIEWER
          </p>
        </div>
      </Link>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to="/" style={linkStyle('/')}>HOME</Link>
        <Link to="/history" style={linkStyle('/history')}>HISTORY</Link>
      </div>
    </nav>
  );
};

export default Navbar;
