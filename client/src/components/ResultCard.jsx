import ScoreBar from './ScoreBar';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { bugs, suggestions, complexity, score, summary } = result;

  const complexityColor = {
    Low: '#3fb950',
    Medium: '#d29922',
    High: '#f85149',
  };

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '1.5rem',
      marginTop: '1.5rem',
    }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#58a6ff' }}>
        Analysis Result
      </h2>

      <ScoreBar score={score} />

      <div style={{
        background: '#21262d',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1.2rem',
        fontSize: '0.9rem',
        color: '#c9d1d9',
        borderLeft: '3px solid #58a6ff',
      }}>
        {summary}
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>Complexity: </span>
        <span style={{
          color: complexityColor[complexity] || '#8b949e',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}>
          {complexity}
        </span>
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '0.95rem', color: '#f85149', marginBottom: '0.5rem' }}>
          🐛 Bugs ({bugs.length})
        </h3>
        {bugs.length === 0 ? (
          <p style={{ color: '#3fb950', fontSize: '0.85rem' }}>No bugs found!</p>
        ) : (
          bugs.map((bug, i) => (
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
          ))
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '0.95rem', color: '#3fb950', marginBottom: '0.5rem' }}>
          💡 Suggestions ({suggestions.length})
        </h3>
        {suggestions.length === 0 ? (
          <p style={{ color: '#8b949e', fontSize: '0.85rem' }}>No suggestions.</p>
        ) : (
          suggestions.map((s, i) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ResultCard;