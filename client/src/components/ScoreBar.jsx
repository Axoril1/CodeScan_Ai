const ScoreBar = ({ score }) => {
  const getColor = () => {
    if (score >= 75) return '#3fb950';
    if (score >= 50) return '#d29922';
    return '#f85149';
  };

  const getLabel = () => {
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Average';
    return 'Poor';
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>Quality Score</span>
        <span style={{ color: getColor(), fontWeight: 700, fontSize: '1rem' }}>
          {score}/100 — {getLabel()}
        </span>
      </div>
      <div style={{
        background: '#21262d',
        borderRadius: '999px',
        height: '8px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${score}%`,
          height: '100%',
          background: getColor(),
          borderRadius: '999px',
          transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  );
};

export default ScoreBar;