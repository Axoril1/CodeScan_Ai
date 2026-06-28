import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#58a6ff' }}>
          🔍 CodeScan AI
        </h1>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: '#e6edf3', textDecoration: 'none', fontSize: '0.95rem' }}>
          Home
        </Link>
        <Link to="/history" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.95rem' }}>
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;