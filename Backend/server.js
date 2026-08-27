require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log('TimeSync API running on port ' + PORT);
  console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('http://localhost:' + PORT);
});
