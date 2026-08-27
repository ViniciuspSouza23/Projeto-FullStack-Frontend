const express = require('express');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const router = express.Router();

// GET /api/datetime
router.get('/', (req, res) => {
  const now = dayjs();
  const nowUtc = dayjs.utc();
  const nowBrt = dayjs().tz('America/Sao_Paulo');
  res.json({
    success: true,
    data: {
      iso: now.toISOString(),
      utc: {
        datetime: nowUtc.format('YYYY-MM-DD HH:mm:ss'),
        date: nowUtc.format('YYYY-MM-DD'),
        time: nowUtc.format('HH:mm:ss'),
        dayOfWeek: nowUtc.format('dddd'),
        timezone: 'UTC',
        offset: '+00:00',
      },
      brt: {
        datetime: nowBrt.format('YYYY-MM-DD HH:mm:ss'),
        date: nowBrt.format('DD/MM/YYYY'),
        time: nowBrt.format('HH:mm:ss'),
        dayOfWeek: nowBrt.format('dddd'),
        timezone: 'America/Sao_Paulo',
        offset: '-03:00',
      },
      timestamp: now.unix(),
      timestampMs: now.valueOf(),
    },
  });
});

// GET /api/datetime/timezone/:tz
router.get('/timezone/:tz', (req, res) => {
  const tzParam = decodeURIComponent(req.params.tz);
  try {
    const nowTz = dayjs().tz(tzParam);
    const offset = nowTz.format('Z');
    res.json({
      success: true,
      data: {
        timezone: tzParam,
        datetime: nowTz.format('YYYY-MM-DD HH:mm:ss'),
        date: nowTz.format('YYYY-MM-DD'),
        time: nowTz.format('HH:mm:ss'),
        dayOfWeek: nowTz.format('dddd'),
        offset,
        iso: nowTz.toISOString(),
        timestamp: nowTz.unix(),
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid timezone',
      message: tzParam + ' is not a valid IANA timezone. Example: America/New_York',
    });
  }
});

module.exports = router;
