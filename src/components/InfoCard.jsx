export default function InfoCard({ title, line1, line2 }) {
  return (
    <div className="info-card">
      <h4>{title}</h4>
      <p>{line1}</p>
      <p className="muted">{line2}</p>
    </div>
  );
}
