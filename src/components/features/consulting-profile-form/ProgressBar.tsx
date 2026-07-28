export default function ProgressBar({ progressPct }: { progressPct: number }) {
  return (
    <div className="cpf-progress-wrap">
      <div className="cpf-progress-inner">
        <div className="cpf-progress-track">
          <div className="cpf-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="cpf-progress-label">Your progress</span>
        <span className="cpf-progress-pct">{progressPct}%</span>
      </div>
    </div>
  );
}
