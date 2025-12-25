export default function StatusCircle({ status, timeLeft }) {
  return (
    <div className="status-circle">
      <p className="status-label">{status}</p>
      <h3>{timeLeft}</h3>
      <span className="muted">Time Left</span>
    </div>
  );
}
