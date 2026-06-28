import ScoreBar from './ScoreBar';

const ResultCard = ({ result }) => {
  if (!result) return null;
  const { bugs, suggestions, complexity, score, summary } = result;

  const complexityColor = {
    Low: { bg: 'rgba(0,166,80,0.15)', border: '#00a650', text: '#50d080' },
    Medium: { bg: 'rgba(200,134,10,0.15)', border: '#c8860a', text: '#ffe066' },
    High: { bg: 'rgba(200,56,10,0.15)', border: '#c8380a', text: '#ff7050' },
  };
  const cc = complexityColor[complexity] || complexityColor.Medium;

  return (
    <div className="fade-in dragon-border" style={{
      background: '#0d0500',
      marginTop: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, #2d1200, #1a0800)',
        padding: '10px 16px',
        borderBottom: '1px solid #c8860a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{ fontFamily: "'Cinzel', serif", color: '#ffe066', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1px' }}>
          🐉 DRAGON SCROLL ANALYSIS
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ background: cc.bg, border: `1px solid ${cc.border}`, borderRadius: '4px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 800, color: cc.text, letterSpacing: '0.5px' }}>
            {complexity.toUpperCase()} COMPLEXITY
          </span>
          <span style={{ background: 'rgba(200,56,10,0.2)', border: '1px solid #c8380a', borderRadius: '4px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 800, color: '#ff7050', letterSpacing: '0.5px' }}>
            🐛 {bugs.length} BUG{bugs.length !== 1 ? 'S' : ''}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.2rem' }}>
        <ScoreBar score={score} />

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c8860a, transparent)', margin: '1rem 0' }} />

        {/* Summary */}
        <div style={{
          borderLeft: '3px solid #ffe066',
          padding: '8px 12px',
          marginBottom: '1.2rem',
          background: 'rgba(255,224,102,0.05)',
          borderRadius: '0 4px 4px 0',
          fontSize: '0.88rem',
          color: '#d4a050',
          fontWeight: 600,
          fontStyle: 'italic',
        }}>
          🥢 "{summary}"
        </div>

        {/* Bugs */}
        <div style={{ marginBottom: '1.2rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#c8380a', marginBottom: '0.6rem' }}>
            ⚡ Bugs Found
          </h3>
          {bugs.length === 0 ? (
            <div style={{ borderLeft: '3px solid #00a650', padding: '8px 12px', background: 'rgba(0,166,80,0.08)', borderRadius: '0 4px 4px 0', fontSize: '0.85rem', color: '#50d080', fontWeight: 700 }}>
              ✅ No bugs! The Dragon Warrior approves.
            </div>
          ) : bugs.map((bug, i) => (
            <div key={i} style={{
              borderLeft: '3px solid #c8380a',
              padding: '8px 12px',
              marginBottom: '0.4rem',
              background: 'rgba(200,56,10,0.08)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.83rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#ff9070',
              fontWeight: 600,
            }}>
              {bug}
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#00a650', marginBottom: '0.6rem' }}>
            🎋 Master Shifu's Suggestions
          </h3>
          {suggestions.length === 0 ? (
            <div style={{ borderLeft: '3px solid #c8860a', padding: '8px 12px', background: 'rgba(200,134,10,0.08)', borderRadius: '0 4px 4px 0', fontSize: '0.85rem', color: '#c8860a', fontWeight: 700 }}>
              No suggestions. Skadoosh! 🥋
            </div>
          ) : suggestions.map((s, i) => (
            <div key={i} style={{
              borderLeft: '3px solid #00a650',
              padding: '8px 12px',
              marginBottom: '0.4rem',
              background: 'rgba(0,166,80,0.08)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.83rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#50d080',
              fontWeight: 600,
            }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
