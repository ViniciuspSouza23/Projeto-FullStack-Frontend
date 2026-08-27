export default function DateTimeCard({ data, loading, error }) {
  const header = (icon, badge, badgeCls) => (
    <div className="card-header">
      <div className="card-title-group">
        <div className={`card-icon ${icon}`}>🕐</div>
        <span className="card-title">Data &amp; Hora</span>
      </div>
      <span className={`card-badge ${badgeCls}`}>{badge}</span>
    </div>
  );

  if (loading) return (
    <div className="card">
      {header("icon-indigo", "Conectando…", "loading")}
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`skeleton skeleton-line ${["wide","mid","wide","slim","mid"][i]}`} />
      ))}
    </div>
  );

  if (error) return (
    <div className="card">
      {header("icon-rose", "Offline", "error")}
      <div className="error-box">Não foi possível conectar à API.<br/>{error}</div>
    </div>
  );

  const utc = data?.utc || {};
  const brt = data?.brt || {};

  return (
    <div className="card">
      {header("icon-indigo", "Ao vivo", "")}

      <div className="card-sub">
        <span className="card-sub-dot" />
        UTC — BRT (Brasília)
      </div>

      <div className="data-row">
        <span className="data-label">UTC Data</span>
        <span className="data-value primary">{utc.date || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">UTC Hora</span>
        <span className="data-value highlight">{utc.time || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Dia da Semana</span>
        <span className="data-value">{utc.dayOfWeek || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">BRT Data</span>
        <span className="data-value primary">{brt.date || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">BRT Hora</span>
        <span className="data-value highlight">{brt.time || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Timestamp</span>
        <span className="data-value muted">{data?.timestamp || "—"}</span>
      </div>
    </div>
  );
}