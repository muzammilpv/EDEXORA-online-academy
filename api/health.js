const CONFIG = require('../src/config');

module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'healthy',
    brand: CONFIG.brand.name,
    uptime: process.uptime(),
    googleScriptConfigured: Boolean(CONFIG.integrations.googleScriptWebAppUrl),
    timestamp: new Date().toISOString()
  }));
};
