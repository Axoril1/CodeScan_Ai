import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';

const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'typescript', 'go', 'rust'];

const Home = () => {
  const [code, setCode] = useState('// Paste your code here...');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!code.trim() || code === '// Paste your code here...') {
      setError('Please enter some code first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/scan', { code, language });
      setResult(res.data.data.result);
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

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          Code Analyzer
        </h2>
        <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
          Paste your code below and get instant AI-powered feedback.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            background: '#21262d',
            color: '#e6edf3',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            background: loading ? '#21262d' : '#238636',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1.25rem',
            fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            transition: 'background 0.2s',
          }}
        >
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Code'}
        </button>

        <button
          onClick={handleClear}
          style={{
            background: 'transparent',
            color: '#8b949e',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden' }}>
        <Editor
          height="380px"
          language={language}
          value={code}
          onChange={(val) => setCode(val)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12 },
          }}
        />
      </div>

      {error && (
        <div style={{
          marginTop: '1rem',
          background: '#21262d',
          borderLeft: '3px solid #f85149',
          padding: '0.75rem 1rem',
          borderRadius: '4px',
          color: '#f85149',
          fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}

      <ResultCard result={result} />
    </div>
  );
};

export default Home;