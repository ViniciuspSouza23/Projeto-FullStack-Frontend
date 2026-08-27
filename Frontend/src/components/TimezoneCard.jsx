import { useTimezone } from "../hooks/useApi";

const SUGGESTIONS = [
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
  "America/Los_Angeles",
  "Pacific/Auckland",
];

export default function TimezoneCard() {
  const { tz, setTz, result, loading, error, lookup } = useTimezone();

  const handleSubmit = (e) => {
    e.preventDefault();
    lookup(tz);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon icon-cyan">🌍</div>
          <span className="card-title">Fuso Horário</span>
        </div>
        {result && <span className="card-badge">{result.offset}</span>}
      </div>

      <div className="card-sub">
        <span className="card-sub-dot" />
        Consulta de Fusos IANA
      </div>

      <form onSubmit={handleSubmit} className="tz-form">
        <input
          className="tz-input"
          type="text"
          value={tz}
          onChange={e => setTz(e.target.value)}
          placeholder="Ex: America/New_York"
          aria-label="Fuso horário IANA"
          id="tz-input"
        />
        <button className="tz-btn" type="submit" disabled={loading || !tz.trim()}>
          {loading ? '…' : 'Buscar'}
        </button>
      </form>

      <div className="tz-suggestions">
        {SUGGESTIONS.map(s => (
          <button key={s} className="tz-chip" type="button" onClick={() => { setTz(s); lookup(s); }}>
            {s.split('/')[1]?.replace('_', ' ') || s}
          </button>
        ))}
      </div>

      {error && <div className="error-box">{error}</div>}

      {result && !error && (
        <>
          <div className="data-row">
            <span className="data-label">Fuso Selecionado</span>
            <span className="data-value primary">{result.timezone}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Data &amp; Hora</span>
            <span className="data-value highlight">{result.datetime}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Dia da Semana</span>
            <span className="data-value">{result.dayOfWeek}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Offset GMT/UTC</span>
            <span className="data-value">{result.offset}</span>
          </div>
        </>
      )}
    </div>
  );
}