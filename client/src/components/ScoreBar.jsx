const ScoreBar = ({ score }) => {
  const getColor = () => {
    if (score >= 75) return '#00a650';
    if (score >= 50) return '#c8860a';
    return '#c8380a';
  };

  const getLabel = () => {
    if (score >= 90) return 'Dragon Warrior 🐉';
    if (score >= 75) return 'Jade Palace Master 🥋';
    if (score >= 50) return 'Panda Student 🐼';
    return 'Panda Cub 🥢';
  };

  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#c8860a' }}>
          Warrior Strength
        </span>
        <span style={{
          background: 'rgba(200,134,10,0.15)',
          border: '1px solid #c8860a',
          borderRadius: '4px',
          padding: '2px 10px',
          fontSize: '0.8rem',
          fontWeight: 800,
          color: '#ffe066',
        }}>
          {score}/100 — {getLabel()}
        </span>
      </div>
      <div style={{
        background: 'rgba(200,134,10,0.1)',
        border: '1px solid rgba(200,134,10,0.3)',
        borderRadius: '4px',
        height: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${score}%`,
          height: '100%',
          background: `linear-gradient(90deg, #c8380a, ${getColor()})`,
          transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  );
};

export default ScoreBar;
