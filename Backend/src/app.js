const express = require('express');
const cors = require('cors');
const datetimeRouter = require('./routes/datetime');
const healthRouter = require('./routes/health');
const notFound = require('./middleware/notFound');

const app = express();

const defaultOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(function(o){ return o.trim().replace(/\/$/, ''); })
  : [];

const allowedOrigins = envOrigins.concat(defaultOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requisições sem origin (como mobile apps, curl, postman ou same-origin)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    // Se CORS_ORIGIN for * ou contiver *, aceita qualquer origem
    if (process.env.CORS_ORIGIN === '*' || envOrigins.indexOf('*') !== -1) {
      return callback(null, true);
    }

    // Aceitar se estiver na lista permitida ou se for um subdomínio da Vercel (.vercel.app)
    if (allowedOrigins.indexOf(cleanOrigin) !== -1 || /\.vercel\.app$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS: ' + origin));
  },
  methods: ['GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.get('/', function(req, res) {
  res.json({
    name: 'TimeSync API',
    version: '1.0.0',
    author: 'Vinic',
    endpoints: {
      datetime: '/api/datetime',
      datetimeTimezone: '/api/datetime/timezone/:tz',
      health: '/api/health',
      info: '/api/info',
    },
  });
});

app.use('/api/datetime', datetimeRouter);
app.use('/api', healthRouter);
app.use(notFound);

module.exports = app;