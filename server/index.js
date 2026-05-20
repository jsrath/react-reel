const cors = require('cors');
const express = require('express');
const catalog = require('./catalog.json');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY || 'USER_KEY_2';

app.use(cors());

function requireApiKey(req, res, next) {
  if (req.get('X-SimpleOvpApi') !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function sendItems(type, res) {
  res.json({
    items: catalog.filter(item => item.type === type),
  });
}

app.get('/api/movie', requireApiKey, (req, res) => sendItems('movie', res));
app.get('/api/serie', requireApiKey, (req, res) => sendItems('serie', res));
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`react-rent-api listening on ${port}`);
});
