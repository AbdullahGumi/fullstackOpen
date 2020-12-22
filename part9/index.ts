import express = require('express');
const app = express();

app.get('/', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});