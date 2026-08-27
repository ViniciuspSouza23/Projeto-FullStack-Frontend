export default function InfoCard({ data, loading, error }) {
  const header = (icon, badge, badgeCls) => (
    <div className="card-header">
      <div className="card-title-group">
        <div className={`card-icon ${icon}`}>⚙️</div>
        <span className="card-title">Info do Sistema</span>
      </div>
      <span className={`card-badge ${badgeCls}`}>{badge}</span>
    </div>
  );

  if (loading) return (
    <div className="card">
      {header("icon-amber", "Carregando…", "loading")}
      <div className="info-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="info-cell">
            <div className="skeleton skeleton-line slim" />
            <div className="skeleton skeleton-line wide" style={{ marginBottom: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="card">
      {header("icon-rose", "Erro", "error")}
      <div className="error-box">Não foi possível carregar as informações do sistema.<br/>{error}</div>
    </div>
  );

  const api    = data?.api    || {};
  const server = data?.server || {};

  const cells = [
    { label: 'API',         value: api.name },
    { label: 'Versão',      value: api.version },
    { label: 'Ambiente',    value: api.environment },
    { label: 'Node.js',     value: server.nodeVersion },
    { label: 'Plataforma',  value: server.platform },
    { label: 'Arquitetura', value: server.arch },
    { label: 'CPUs',        value: server.cpus },
    { label: 'Hostname',    value: server.hostname },
  ];

  return (
    <div className="card">
      {header("icon-amber", api.environment || "dev", "")}

      <div className="card-sub">
        <span className="card-sub-dot" />
        Configurações do Servidor
      </div>

      <div className="info-grid">
        {cells.map(({ label, value }) => (
          <div className="info-cell" key={label}>
            <div className="info-cell-label">{label}</div>
            <div className="info-cell-value">{value ?? '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}