const notFound = function(req, res) {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: 'Cannot ' + req.method + ' ' + req.originalUrl,
    availableRoutes: ['GET /', 'GET /api/datetime', 'GET /api/datetime/timezone/:tz', 'GET /api/health', 'GET /api/info'],
  });
};
module.exports = notFound;
