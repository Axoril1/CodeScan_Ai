import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GiScrollUnfurled } from 'react-icons/gi';

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a0a00',
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,134,10,0.04) 0px, rgba(200,134,10,0.04) 1px, transparent 1px, transparent 50%)',
      backgroundSize: '20px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        border: '2px solid #c8860a',
        borderRadius: '6px',
        boxShadow: '0 0 40px rgba(200,134,10,0.15)',
        background: '#0d0500',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <GiScrollUnfurled size={48} color="#ffe066" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.6rem', fontWeight: 900, color: '#ffe066', letterSpacing: '2px', textShadow: '0 0 10px rgba(255,200,50,0.3)', marginBottom: '4px' }}>
            CODESCAN AI
          </h1>
          <p style={{ fontSize: '0.65rem', color: '#c8860a', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>
            The Dragon Warrior Code Reviewer
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c8860a, transparent)', margin: '1.5rem 0' }} />

        <p style={{ color: '#d4a050', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.6 }}>
          Sign in to unlock unlimited code reviews and save your scan history.
        </p>

        {/* Google Button */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            background: '#fff',
            color: '#1a1a1a',
            border: '2px solid #c8860a',
            borderRadius: '4px',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(200,134,10,0.15)',
            transition: 'all 0.2s ease',
          }}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c8860a, transparent)', margin: '1.5rem 0' }} />

        <p style={{ color: '#8b6020', fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.6 }}>
          By signing in, you agree to our terms. Your code is never stored beyond what you choose to save.
        </p>
      </div>
    </div>
  );
};

export default Login;
