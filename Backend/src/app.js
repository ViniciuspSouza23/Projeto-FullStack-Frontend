const express = require('express');
const cors = require('cors');
const datetimeRouter = require('./routes/datetime');
const healthRouter = require('./routes/health');
const notFound = require('./middleware/notFound');

const app = express();

const defaultOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(function(o){ return o.trim(); }).concat(defaultOrigins)
  : defaultOrigins;

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET'],
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
