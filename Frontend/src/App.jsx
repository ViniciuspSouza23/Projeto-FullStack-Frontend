import { useState, useEffect } from "react";
import "./App.css";
import { useApi } from "./hooks/useApi";
import DateTimeCard from "./components/DateTimeCard";
import HealthCard from "./components/HealthCard";
import TimezoneCard from "./components/TimezoneCard";
import InfoCard from "./components/InfoCard";

function useLocalClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pad(n) { return String(n).padStart(2, "0"); }

export default function App() {
  const localNow = useLocalClock();
  const hh = pad(localNow.getHours());
  const mm = pad(localNow.getMinutes());
  const ss = pad(localNow.getSeconds());

  const weekday = localNow.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayMonth = localNow.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const datetime = useApi("/api/datetime", { interval: 5000 });
  const health   = useApi("/api/health",   { interval: 10000 });
  const info     = useApi("/api/info");
  const apiOnline = !health.error && !health.loading;

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">⏱</div>
          <div>
            <div className="navbar-name">Time<span>Sync</span></div>
            <div className="navbar-tag">REST API · Dashboard</div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-clock-wrap">
            <div className="navbar-clock-label">Horário Local</div>
            <div className="navbar-clock-value">{hh}:{mm}:{ss}</div>
          </div>
          <div className="navbar-status">
            <div className="status-dot" />
            {apiOnline ? "API Online" : "API Offline"}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" aria-label="Relógio em tempo real">
        <div className="hero-glow" />
        <div className="hero-pill">
          <span className="pulse-ring" />
          Ao Vivo
        </div>
        <div className="hero-time">
          <span className="hero-time-seg">{hh}</span>
          <span className="hero-time-sep">:</span>
          <span className="hero-time-seg">{mm}</span>
          <span className="hero-time-sep">:</span>
          <span className="hero-time-seconds">{ss}</span>
        </div>
        <div className="hero-date">
          <strong>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</strong>, {dayMonth}
        </div>
        <div className="hero-tz">
          🌐 {userTz}
        </div>
      </section>

      {/* SERVER DATA */}
      <div className="section-divider">
        <div className="section-divider-line" />
        <div className="section-divider-label">📡 Dados do Servidor</div>
        <div className="section-divider-line" />
      </div>
      <div className="grid grid-2">
        <DateTimeCard data={datetime.data} loading={datetime.loading} error={datetime.error} />
        <HealthCard   data={health.data}   loading={health.loading}   error={health.error} />
      </div>

      {/* TOOLS */}
      <div className="section-divider">
        <div className="section-divider-line" />
        <div className="section-divider-label">🌐 Ferramentas</div>
        <div className="section-divider-line" />
      </div>
      <div className="grid grid-2">
        <TimezoneCard />
        <InfoCard data={info.data} loading={info.loading} error={info.error} />
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">Time<span>Sync</span></div>
          <div className="footer-links">
            <a href="https://expressjs.com" target="_blank" rel="noreferrer">Express.js</a>
            <span className="footer-sep">·</span>
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">React + Vite</a>
            <span className="footer-sep">·</span>
            <a href="https://render.com" target="_blank" rel="noreferrer">Render</a>
            <span className="footer-sep">·</span>
            <a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a>
          </div>
        </div>
      </footer>

    </div>
  );
}