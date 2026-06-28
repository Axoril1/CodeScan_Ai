import { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/history');
        setScans(res.data.data);
      } catch (err) {
        setError('Failed to load history. Make sure server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 75) return '#3fb950';
    if (score >= 50) return '#d29922';
    return '#f85149';
  };

  const getComplexityColor = (complexity) => {
    const map = { Low: '#3fb950', Medium: '#d29922', High: '#f85149' };
    return map[complexity] || '#8b949e';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', color: '#8b949e' }}>
      Loading history...
    </div>
  );

  if (error) return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', color: '#f85149' }}>
      {error}
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          Scan History
        </h2>
        <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
          {scans.length} past scan{scans.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {scans.length === 0 ? (
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          color: '#8b949e',
        }}>
          No scans yet. Go analyze some code!
        </div>
      ) : (
        scans.map((scan) => (
          <div key={scan._id} style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            marginBottom: '1rem',
            overflow: 'hidden',
          }}>
            
            <div
              onClick={() => setExpanded(expanded === scan._id ? null : scan._id)}
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                
                <span style={{
                  background: '#21262d',
                  color: '#58a6ff',
                  border: '1px solid #30363d',
                  borderRadius: '20px',
                  padding: '2px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  {scan.language}
                </span>

                
                <span style={{
                  color: getScoreColor(scan.result.score),
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}>
                  {scan.result.score}/100
                </span>

                
                <span style={{
                  color: getComplexityColor(scan.result.complexity),
                  fontSize: '0.85rem',
                }}>
                  {scan.result.complexity} complexity
                </span>

                
                <span style={{ color: '#f85149', fontSize: '0.85rem' }}>
                  🐛 {scan.result.bugs.length} bug{scan.result.bugs.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>
                  {formatDate(scan.createdAt)}
                </span>
                <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>
                  {expanded === scan._id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            
            {expanded === scan._id && (
              <div style={{ borderTop: '1px solid #30363d', padding: '1.25rem' }}>

                
                <div style={{
                  background: '#21262d',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  color: '#c9d1d9',
                  borderLeft: '3px solid #58a6ff',
                }}>
                  {scan.result.summary}
                </div>

               
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#f85149', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    🐛 Bugs
                  </h4>
                  {scan.result.bugs.length === 0 ? (
                    <p style={{ color: '#3fb950', fontSize: '0.85rem' }}>No bugs found!</p>
                  ) : scan.result.bugs.map((bug, i) => (
                    <div key={i} style={{
                      background: '#21262d',
                      borderLeft: '3px solid #f85149',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.4rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      color: '#c9d1d9',
                    }}>
                      {bug}
                    </div>
                  ))}
                </div>

               
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#3fb950', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    💡 Suggestions
                  </h4>
                  {scan.result.suggestions.length === 0 ? (
                    <p style={{ color: '#8b949e', fontSize: '0.85rem' }}>No suggestions.</p>
                  ) : scan.result.suggestions.map((s, i) => (
                    <div key={i} style={{
                      background: '#21262d',
                      borderLeft: '3px solid #3fb950',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.4rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      color: '#c9d1d9',
                    }}>
                      {s}
                    </div>
                  ))}
                </div>

                
                <div>
                  <h4 style={{ color: '#8b949e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    📄 Code
                  </h4>
                  <pre style={{
                    background: '#21262d',
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontSize: '0.8rem',
                    color: '#c9d1d9',
                    overflowX: 'auto',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}>
                    {scan.code}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default History;
