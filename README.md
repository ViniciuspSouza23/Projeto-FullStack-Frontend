# ⏱️ TimeSync — Full-Stack Application

Uma aplicação Full-Stack moderna para monitoramento de data, hora e métricas de sistema em tempo real, integrando uma **API REST com Express.js** a uma **Dashboard SPA em React + Vite**.

---

## 🚀 Tecnologias Utilizadas

### **Backend (`/Backend`)**
- **Runtime & Framework**: Node.js & Express.js
- **Manipulação de Datas**: `dayjs` (plugins UTC e Timezone)
- **Segurança & CORS**: `cors` com origens configuráveis via ambiente
- **Ambiente & Deploy**: `dotenv`, Nodemon, hospedado na **Render**

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
│   │   ├── routes/          # Endpoints de datetime, health e info
│   │   ├── middleware/      # Tratamento de erro 404 e utilitários
│   │   └── app.js           # Configuração do Express e middlewares
│   ├── server.js            # Inicialização do servidor HTTP
│   └── package.json
│
├── Frontend/                # Dashboard SPA em React + Vite
│   ├── src/
│   │   ├── components/      # Cards (DateTime, HealthCheck, Timezone, SystemInfo)
│   │   ├── hooks/           # Custom hook useApi (fetch e polling)
│   │   ├── App.jsx          # Interface e relógio ao vivo
│   │   ├── App.css          # Estilos e animações dos componentes
│   │   └── index.css        # Variáveis globais do design system
│   ├── vercel.json          # Configuração de rotas SPA na Vercel
│   └── package.json
│
└── README.md                # Documentação do projeto
```

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Informações gerais e índice de rotas da API |
| `GET` | `/api/datetime` | Retorna data/hora do servidor em **UTC** e **BRT** + Timestamp |
| `GET` | `/api/datetime/timezone/:tz` | Consulta data/hora de qualquer fuso horário IANA (ex: `America/New_York`) |
| `GET` | `/api/health` | Status de operação, tempo de uptime e uso de memória RAM |
| `GET` | `/api/info` | Informações sobre o ambiente Node.js, sistema operacional e CPUs |

---

## 💻 Como Rodar o Projeto Localmente

### **Prerequisites**
- Node.js (versão 18 ou superior)
- npm ou yarn

### **1. Executando o Backend**
```bash
cd Backend
npm install
npm run dev
```
O servidor estará rodando em `http://localhost:3001`.

### **2. Executando o Frontend**
Em outro terminal:
```bash
cd Frontend
npm install
npm run dev
```
A aplicação estará acessível em `http://localhost:5173`.

---

## ☁️ Guia de Deploy

### **1. Backend na Render**
1. Crie um novo **Web Service** no [Render](https://render.com/).
2. Conecte seu repositório do GitHub.
3. Configure os seguintes campos:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Em **Environment Variables**, adicione:
   - `PORT`: `3001`
   - `CORS_ORIGIN`: `https://seu-frontend.vercel.app` *(defina após criar a Vercel)*

### **2. Frontend na Vercel**
1. Crie um novo projeto no [Vercel](https://vercel.com/).
2. Importe o repositório do GitHub.
3. Configure os seguintes campos:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
4. Em **Environment Variables**, adicione:
   - `VITE_API_URL`: `https://seu-backend.onrender.com` *(URL gerada pelo Render)*
5. Clique em **Deploy**.

---

## 📝 Licença
Este projeto foi desenvolvido para fins didáticos e de demonstração full-stack.