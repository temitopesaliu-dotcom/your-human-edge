export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progressWidth = (current / total) * 100;

  return (
    <div className="form-progress" aria-label="Application progress">
      <div className="form-progress-bar">
        <div className="form-progress-fill" style={{ width: `${progressWidth}%` }} />
      </div>
      <div className="form-progress-label">
        Step <span>{current}</span> of <span>{total}</span>
      </div>
    </div>
  );
}
