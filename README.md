# ⏱️ TimeSync — Full-Stack Application

Uma aplicação Full-Stack moderna para monitoramento de data, hora e métricas de sistema em tempo real, integrando uma **API REST em Express.js** a uma **Dashboard SPA em React + Vite**.

---

## 🔗 Links Oficiais do Projeto

- **🌐 Frontend (Dashboard)**: [https://projeto-full-stack-frontend-app.vercel.app/](https://projeto-full-stack-frontend-app.vercel.app/)
- **⚡ Backend (API REST)**: [https://projeto-fullstack-frontend.onrender.com/](https://projeto-fullstack-frontend.onrender.com/)
- **📂 Repositório GitHub**: [https://github.com/ViniciuspSouza23/Projeto-FullStack-Frontend/tree/main](https://github.com/ViniciuspSouza23/Projeto-FullStack-Frontend/tree/main)

---

## 🛠️ Tecnologias Utilizadas

### **Backend (`/Backend`)**
- **Runtime & Framework**: Node.js & Express.js
- **Manipulação de Datas**: `dayjs` (plugins UTC, Timezone e CustomParseFormat)
- **Segurança & CORS**: `cors` dinâmico com suporte automático a subdomínios Vercel
- **Deploy**: Hospedado na **Render**

### **Frontend (`/Frontend`)**
- **Framework & Build**: React 18 & Vite
- **Interface & Estilo**: Vanilla CSS (Glassmorphism, Dark Mode, Design System responsivo)
- **Tipografia**: Google Fonts (*Inter* e *JetBrains Mono*)
- **Deploy**: Hospedado na **Vercel**

---

## 📁 Estrutura do Projeto

```text
full-stack/
├── Backend/                 # API REST em Express.js
│   ├── src/
│   │   ├── routes/          # Endpoints (/api/datetime, /api/health, /api/info)
│   │   ├── middleware/      # Tratamento de erros 404 e utilitários
│   │   └── app.js           # Configuração do Express e CORS
│   ├── server.js            # Inicialização do servidor HTTP
│   └── package.json
│
├── Frontend/                # Dashboard SPA em React + Vite
│   ├── src/
│   │   ├── components/      # Cards (DateTime, HealthCheck, Timezone, SystemInfo)
│   │   ├── hooks/           # Custom hook useApi (fetch, sanitização de URL e polling)
│   │   ├── App.jsx          # Interface principal e relógio ao vivo
│   │   ├── App.css          # Estilos dos componentes
│   │   └── index.css        # Design System (tokens globais)
│   ├── vercel.json          # Roteamento SPA na Vercel
│   └── package.json
│
└── README.md                # Documentação do repositório
```

---

## 📡 Endpoints da API REST

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Boas-vindas e índice de endpoints disponíveis |
| `GET` | `/api/datetime` | Data e hora atual do servidor em UTC e BRT + Timestamp |
| `GET` | `/api/datetime/timezone/:tz` | Data/hora em qualquer fuso horário IANA (ex: `America/New_York`) |
| `GET` | `/api/health` | Status da API, tempo de uptime e consumo de memória RAM |
| `GET` | `/api/info` | Informações da API, plataforma, versão do Node e CPUs |

---

## ⚙️ Configuração nos Painéis de Deploy

### 🟢 **Render (Backend)**
- **Root Directory**: `Backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Variáveis de Ambiente**:
  - `PORT`: `3001`
  - `CORS_ORIGIN`: `https://projeto-full-stack-frontend-app.vercel.app`

### ▲ **Vercel (Frontend)**
- **Framework Preset**: `Vite`
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Variáveis de Ambiente**:
  - `VITE_API_URL`: `https://projeto-fullstack-frontend.onrender.com`