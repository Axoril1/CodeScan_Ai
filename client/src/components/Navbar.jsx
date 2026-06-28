import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#58a6ff' : '#8b949e',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: location.pathname === path ? 600 : 400,
    borderBottom: location.pathname === path ? '2px solid #58a6ff' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'all 0.2s ease',
  });

  return (
    <nav style={{
      background: '#161b22',
      borderBottom: '1px solid #30363d',
      padding: '0 2rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🔍</span>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#58a6ff' }}>
          CodeScan <span style={{ color: '#e6edf3' }}>AI</span>
        </h1>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={linkStyle('/')}>Home</Link>
        <Link to="/history" style={linkStyle('/history')}>History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
