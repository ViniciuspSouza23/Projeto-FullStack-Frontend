export default function HealthCard({ data, loading, error }) {
  const header = (icon, badge, badgeCls) => (
    <div className="card-header">
      <div className="card-title-group">
        <div className={`card-icon ${icon}`}>💚</div>
        <span className="card-title">Health Check</span>
      </div>
      <span className={`card-badge ${badgeCls}`}>{badge}</span>
    </div>
  );

  if (loading) return (
    <div className="card">
      {header("icon-green", "Verificando…", "loading")}
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`skeleton skeleton-line ${i % 2 === 0 ? "wide" : "mid"}`} />
      ))}
    </div>
  );

  if (error) return (
    <div className="card">
      {header("icon-rose", "Offline", "error")}
      <div className="error-box">Servidor inacessível.<br/>{error}</div>
    </div>
  );

  const mem = data?.memory || {};
  const up  = data?.uptime || {};
  const usedPct = parseFloat(mem.usagePercent) || 0;
  const pctColor = usedPct > 85 ? "var(--error)" : usedPct > 65 ? "var(--warning)" : "var(--success-light)";

  return (
    <div className="card">
      {header("icon-green", "● Online", "")}

      <div className="card-sub">
        <span className="card-sub-dot" />
        Sistema Operacional
      </div>

      <div className="data-row">
        <span className="data-label">Status</span>
        <span className="data-value success">{data?.status?.toUpperCase() || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Uptime</span>
        <span className="data-value primary">{up.human || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Mem. Total</span>
        <span className="data-value">{mem.total || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Mem. Livre</span>
        <span className="data-value">{mem.free || "—"}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Mem. Usada</span>
        <span className="data-value">{mem.used || "—"}</span>
      </div>

      <div className="mem-bar-wrap">
        <div className="mem-bar-header">
          <span className="mem-bar-label">Uso de Memória</span>
          <span className="mem-bar-pct" style={{ color: pctColor }}>{mem.usagePercent || "0%"}</span>
        </div>
        <div className="mem-bar-track">
          <div className="mem-bar-fill" style={{ width: usedPct + "%", background: "linear-gradient(90deg, var(--accent), " + pctColor + ")" }} />
        </div>
      </div>
    </div>
  );
}