import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiCode, FiTrash2 } from 'react-icons/fi';
import { GiScrollUnfurled } from 'react-icons/gi';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdOutlineDoneAll } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'typescript', 'go', 'rust'];
const GUEST_LIMIT = 1;

const LoadingSkeleton = () => (
  <div className="dragon-border" style={{ background: '#0d0500', padding: '1.5rem', marginTop: '1.5rem' }}>
    <p className="pulse" style={{ color: '#c8860a', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <BiLoaderAlt size={16} /> Po is reviewing your code...
    </p>
    {[100, 70, 100, 60].map((w, i) => (
      <div key={i} className="pulse" style={{ background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)', height: '14px', borderRadius: '4px', marginTop: '0.75rem', width: `${w}%` }} />
    ))}
  </div>
);

const GuestLimitModal = ({ onLogin }) => (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 999, padding: '1rem',
  }}>
    <div style={{
      background: '#0d0500', border: '2px solid #c8860a',
      borderRadius: '6px', padding: '2.5rem',
      maxWidth: '400px', width: '100%', textAlign: 'center',
      boxShadow: '0 0 40px rgba(200,134,10,0.2)',
    }}>
      <GiScrollUnfurled size={40} color="#ffe066" style={{ marginBottom: '1rem' }} />
      <h3 style={{ fontFamily: "'Cinzel', serif", color: '#ffe066', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '0.75rem' }}>
        Your Free Scroll is Used
      </h3>
      <p style={{ color: '#d4a050', fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.6, marginBottom: '1.5rem' }}>
        You have used your 1 free scan. Sign in with Google to unlock unlimited reviews and save your history.
      </p>
      <button
        onClick={onLogin}
        style={{
          width: '100%', background: '#fff', color: '#1a1a1a',
          border: '2px solid #c8860a', borderRadius: '4px',
          padding: '12px 20px', fontSize: '0.9rem', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', cursor: 'pointer',
        }}
      >
        <FcGoogle size={20} /> Continue with Google
      </button>
    </div>
  </div>
);

const Home = () => {
  const [code, setCode] = useState('// Paste your code here...');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const guestScans = parseInt(localStorage.getItem('guestScans') || '0');

  const handleScan = async () => {
    if (!code.trim() || code === '// Paste your code here...') {
      setError('Please enter some code first.');
      return;
    }

    // Check guest limit
    if (!user && guestScans >= GUEST_LIMIT) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const headers = {};
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/scan`,
        { code, language },
        { headers }
      );

      setResult(res.data.data.result);

      // Increment guest scan count
      if (!user) {
        localStorage.setItem('guestScans', guestScans + 1);
      }
    } catch (err) {
      setError('Something went wrong. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('// Paste your code here...');
    setResult(null);
    setError('');
  };

  const handleLoginFromModal = async () => {
    try {
      await loginWithGoogle();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box' }}>
      {showModal && <GuestLimitModal onLogin={handleLoginFromModal} />}

      {/* Hero */}
      <div className="dragon-border" style={{
        background: 'linear-gradient(135deg, #2d1200 0%, #1a0800 100%)',
        padding: '1.5rem', marginBottom: '1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.04, pointerEvents: 'none' }}>
          <GiScrollUnfurled size={160} color="#ffe066" />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #ffe066, #c8860a, #ffe066)' }} />
        <div style={{ paddingLeft: '1rem' }}>
          <p style={{ fontSize: '0.65rem', color: '#c8860a', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            The Dragon Scroll of Code Review
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.4rem', fontWeight: 900, color: '#ffe066', lineHeight: 1.3, marginBottom: '6px', textShadow: '0 0 10px rgba(255,200,50,0.3)' }}>
            There is no secret ingredient.<br />Your code just needs review.
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#d4a050', fontWeight: 600 }}>
            {user ? `Welcome back, ${user.displayName.split(' ')[0]}. Your scrolls await.` : `1 free scan available. Sign in for unlimited access.`}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            background: 'rgba(200,134,10,0.1)', color: '#ffe066',
            border: '1px solid #c8860a', borderRadius: '4px',
            padding: '8px 14px', fontSize: '0.82rem',
            fontFamily: "'Nunito', sans-serif", fontWeight: 800,
            letterSpacing: '1px', cursor: 'pointer',
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang} style={{ background: '#1a0a00' }}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            background: loading ? 'rgba(200,134,10,0.1)' : 'linear-gradient(135deg, #c8380a, #8b1a00)',
            color: loading ? '#c8860a' : '#ffe066',
            border: '1px solid #c8860a', borderRadius: '4px',
            padding: '8px 20px', fontSize: '0.85rem', fontWeight: 800,
            letterSpacing: '1px', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <FiCode size={15} />
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>

        <button
          onClick={handleClear}
          style={{
            background: 'transparent', color: '#c8860a',
            border: '1px solid rgba(200,134,10,0.4)', borderRadius: '4px',
            padding: '8px 16px', fontSize: '0.85rem', fontWeight: 800,
            letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <FiTrash2 size={14} /> Clear
        </button>

        {result && (
          <span style={{
            marginLeft: 'auto', background: 'rgba(0,166,80,0.1)',
            border: '1px solid #00a650', borderRadius: '4px',
            padding: '4px 12px', fontSize: '0.8rem', fontWeight: 800,
            color: '#50d080', letterSpacing: '0.5px',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <MdOutlineDoneAll size={15} /> Analysis Complete
          </span>
        )}
      </div>

      {/* Editor */}
      <div className="dragon-border" style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
        <div style={{
          background: 'linear-gradient(90deg, #2d1200, #1a0800)',
          padding: '7px 14px', borderBottom: '1px solid #c8860a',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c8380a', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffe066', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00a650', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block' }} />
          <span style={{ color: '#c8860a', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2px', marginLeft: '6px', fontFamily: "'JetBrains Mono', monospace" }}>
            SCROLL OF {language.toUpperCase()}
          </span>
        </div>
        <Editor
          height="360px"
          language={language}
          value={code}
          onChange={(val) => setCode(val)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            fontFamily: 'JetBrains Mono, monospace',
          }}
        />
      </div>

      {error && (
        <div style={{
          marginTop: '1rem', borderLeft: '3px solid #c8380a',
          padding: '0.75rem 1rem', background: 'rgba(200,56,10,0.08)',
          borderRadius: '0 4px 4px 0', fontSize: '0.88rem',
          fontWeight: 700, color: '#ff7050',
        }}>
          {error}
        </div>
      )}

      {loading && <LoadingSkeleton />}
      {!loading && result && <ResultCard result={result} />}
    </div>
  );
};

export default Home;
