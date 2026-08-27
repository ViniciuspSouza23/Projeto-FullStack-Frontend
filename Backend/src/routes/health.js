const express = require('express');
const os = require('os');

const router = express.Router();
const startTime = Date.now();

router.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeHours = Math.floor(uptimeMinutes / 60);
  let uptimeHuman;
  if (uptimeHours > 0) {
    uptimeHuman = uptimeHours + 'h ' + (uptimeMinutes % 60) + 'm ' + (uptimeSeconds % 60) + 's';
  } else if (uptimeMinutes > 0) {
    uptimeHuman = uptimeMinutes + 'm ' + (uptimeSeconds % 60) + 's';
  } else {
    uptimeHuman = uptimeSeconds + 's';
  }
  const totalMem = Math.round(os.totalmem() / 1024 / 1024);
  const freeMem  = Math.round(os.freemem()  / 1024 / 1024);
  const usedMem  = totalMem - freeMem;
  const usagePct = ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1) + '%';
  res.json({
    success: true,
    data: {
      status: 'ok',
      uptime: { seconds: uptimeSeconds, minutes: uptimeMinutes, hours: uptimeHours, human: uptimeHuman },
      memory: { total: totalMem + ' MB', free: freeMem + ' MB', used: usedMem + ' MB', usagePercent: usagePct },
      timestamp: new Date().toISOString(),
    },
  });
});

router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      api: { name: 'TimeSync API', version: '1.0.0', environment: process.env.NODE_ENV || 'development' },
      server: { platform: os.platform(), arch: os.arch(), nodeVersion: process.version, cpus: os.cpus().length, hostname: os.hostname() },
    },
  });
});

module.exports = router;
