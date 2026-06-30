import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { GiScrollUnfurled } from 'react-icons/gi';
import { FiChevronDown, FiChevronUp, FiCode, FiTrash2 } from 'react-icons/fi';
import { GiBugNet } from 'react-icons/gi';
import { FaLightbulb } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!user) {
          setError('Not logged in.');
          setLoading(false);
          return;
        }
        const token = await user.getIdToken(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScans(res.data.data);
      } catch (err) {
        console.error('History error:', err);
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const deleteOne = async (id) => {
    try {
      const token = await user.getIdToken(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScans(scans.filter((s) => s._id !== id));
    } catch {
      alert('Failed to delete scan.');
    }
  };

  const deleteAll = async () => {
    if (!confirm('Delete all scans? This cannot be undone.')) return;
    try {
      const token = await user.getIdToken(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScans([]);
    } catch {
      alert('Failed to delete all scans.');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#50d080';
    if (score >= 50) return '#ffe066';
    return '#ff7050';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box', color: '#c8860a', fontWeight: 800 }} className="pulse">
      Fetching the ancient scrolls...
    </div>
  );

  if (error) return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box', color: '#ff7050', fontWeight: 800 }}>
      {error}
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box' }}>

      <div className="dragon-border" style={{
        background: 'linear-gradient(135deg, #2d1200, #1a0800)',
        padding: '1.2rem 1.5rem', marginBottom: '1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #ffe066, #c8860a, #ffe066)' }} />
        <div style={{ paddingLeft: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GiScrollUnfurled size={28} color="#ffe066" />
            <div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', fontWeight: 900, color: '#ffe066', letterSpacing: '1px' }}>
                The Ancient Scrolls
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#c8860a', fontWeight: 700, marginTop: '2px' }}>
                {scans.length} scroll{scans.length !== 1 ? 's' : ''} in the Jade Palace archives
              </p>
            </div>
          </div>
          {scans.length > 0 && (
            <button
              onClick={deleteAll}
              style={{
                background: 'rgba(200,56,10,0.15)', color: '#ff7050',
                border: '1px solid #c8380a', borderRadius: '4px',
                padding: '8px 14px', fontSize: '0.8rem', fontWeight: 800,
                letterSpacing: '0.5px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <MdDeleteSweep size={16} /> Delete All
            </button>
          )}
        </div>
      </div>

      {scans.length === 0 ? (
        <div className="dragon-border" style={{ background: '#0d0500', padding: '3rem', textAlign: 'center', color: '#c8860a', fontWeight: 800 }}>
          No scrolls yet. Go analyze some code, young warrior.
        </div>
      ) : scans.map((scan) => (
        <div key={scan._id} className="dragon-border" style={{ background: '#0d0500', marginBottom: '1rem', overflow: 'hidden' }}>
          <div
            onClick={() => setExpanded(expanded === scan._id ? null : scan._id)}
            style={{
              padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', cursor: 'pointer',
              flexWrap: 'wrap', gap: '0.75rem',
              background: expanded === scan._id ? 'rgba(200,134,10,0.08)' : 'transparent',
              borderBottom: expanded === scan._id ? '1px solid rgba(200,134,10,0.3)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(200,134,10,0.15)', border: '1px solid #c8860a', borderRadius: '4px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 800, color: '#ffe066', letterSpacing: '1px' }}>
                {scan.language.toUpperCase()}
              </span>
              <span style={{ color: getScoreColor(scan.result.score), fontWeight: 800, fontSize: '0.88rem' }}>
                {scan.result.score}/100
              </span>
              <span style={{ color: '#ff7050', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GiBugNet size={13} /> {scan.result.bugs.length} bug{scan.result.bugs.length !== 1 ? 's' : ''}
              </span>
              <span style={{ color: '#c8860a', fontSize: '0.82rem', fontWeight: 600 }}>
                {scan.result.complexity} complexity
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#8b6020', fontSize: '0.78rem', fontWeight: 600 }}>{formatDate(scan.createdAt)}</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteOne(scan._id); }}
                style={{
                  background: 'rgba(200,56,10,0.1)', color: '#ff7050',
                  border: '1px solid rgba(200,56,10,0.3)', borderRadius: '4px',
                  padding: '4px 8px', fontSize: '0.75rem', fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <FiTrash2 size={11} /> Delete
              </button>
              {expanded === scan._id ? <FiChevronUp size={16} color="#c8860a" /> : <FiChevronDown size={16} color="#c8860a" />}
            </div>
          </div>

          {expanded === scan._id && (
            <div style={{ padding: '1.25rem' }} className="fade-in">
              <div style={{ borderLeft: '3px solid #ffe066', padding: '8px 12px', marginBottom: '1rem', background: 'rgba(255,224,102,0.05)', borderRadius: '0 4px 4px 0', fontSize: '0.88rem', color: '#d4a050', fontWeight: 600, fontStyle: 'italic' }}>
                "{scan.result.summary}"
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#c8380a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GiBugNet size={13} /> Bugs
                </h4>
                {scan.result.bugs.length === 0 ? (
                  <div style={{ borderLeft: '3px solid #00a650', padding: '8px 12px', background: 'rgba(0,166,80,0.08)', color: '#50d080', fontSize: '0.85rem', fontWeight: 700 }}>No bugs found.</div>
                ) : scan.result.bugs.map((bug, i) => (
                  <div key={i} style={{ borderLeft: '3px solid #c8380a', padding: '8px 12px', marginBottom: '0.4rem', background: 'rgba(200,56,10,0.08)', fontSize: '0.83rem', fontFamily: "'JetBrains Mono', monospace", color: '#ff9070', fontWeight: 600 }}>{bug}</div>
                ))}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#00a650', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaLightbulb size={12} /> Suggestions
                </h4>
                {scan.result.suggestions.map((s, i) => (
                  <div key={i} style={{ borderLeft: '3px solid #00a650', padding: '8px 12px', marginBottom: '0.4rem', background: 'rgba(0,166,80,0.08)', fontSize: '0.83rem', fontFamily: "'JetBrains Mono', monospace", color: '#50d080', fontWeight: 600 }}>{s}</div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#8b6020', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCode size={13} /> Code
                </h4>
                <pre style={{ background: '#080300', border: '1px solid rgba(200,134,10,0.3)', borderRadius: '4px', padding: '1rem', fontSize: '0.8rem', overflowX: 'auto', maxHeight: '200px', overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", color: '#d4a050' }}>
                  {scan.code}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
