type GateId = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6';

const GATES: { id: GateId; num: string; label: string }[] = [
  { id: 'g1', num: 'Gate 01', label: 'The Clone' },
  { id: 'g2', num: 'Gate 02', label: 'Posting' },
  { id: 'g3', num: 'Gate 03', label: 'Monetize' },
  { id: 'g4', num: 'Gate 04', label: 'The Payout' },
  { id: 'g5', num: 'Gate 05', label: 'Revenue' },
  // { id: 'g6', num: 'Gate 06', label: 'Advanced' }, // temporarily hidden
];

interface GateNavProps {
  activeGate: GateId;
  onGateChange: (id: GateId) => void;
}

export function GateNav({ activeGate, onGateChange }: GateNavProps) {
  return (
    <div className="as-nav" style={{
      display: 'flex',
      gap: 2,
      background: 'var(--ink)',
      overflowX: 'auto',
    }}>
      {GATES.map((gate) => (
        <button
          key={gate.id}
          type="button"
          className={`gatebtn${activeGate === gate.id ? ' active' : ''}`}
          onClick={() => onGateChange(gate.id)}
          style={{
            flex: '1 1 0',
            minWidth: 100,
            background: activeGate === gate.id ? 'var(--chalk)' : 'var(--ink)',
            color: activeGate === gate.id ? 'var(--ink)' : 'rgba(246, 241, 228, 0.55)',
            border: 'none',
            padding: '12px 8px 10px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background 0.15s, color 0.15s',
            borderBottom: activeGate === gate.id ? '3px solid var(--floodlight)' : '3px solid transparent',
          }}
        >
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 10,
            letterSpacing: 1.5,
            color: activeGate === gate.id ? 'var(--floodlight-dim)' : 'var(--floodlight)',
            display: 'block',
          }}>
            {gate.num}
          </span>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 13,
            letterSpacing: 0.3,
            display: 'block',
            marginTop: 3,
          }}>
            {gate.label}
          </span>
        </button>
      ))}
    </div>
  );
}

