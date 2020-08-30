const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Routes.
app.get('/api', async (req, res) => {
  res.send('Root route.');
});

app.post('/api/posts', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'thisisasecret', (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    res.json({ result });
  });
});

app.post('/api/login', async (req, res) => {
  // Mock user.
  // Normally, you'd do some authentication stuff here where there will be a user instance in ~
  // ~ the request.
  const user = {
    id: 1,
    username: 'joe',
    email: 'joe@mail.com',
  };

  jwt.sign({ user }, 'thisisasecret', (err, token) => {
    res.json({
      token,
    });
  });
});

app.listen(3500, () => console.log('The server is listening on port 3500...'));

// ======================================================================================================== //

function verifyToken(req, res, next) {
  // Bearer token format will be: "Bearer <access_token>".
  let bearerHeader = req.headers['authorization'];
  if (!bearerHeader || !bearerHeader.startsWith('Bearer'))
    return res.sendStatus(403);

  req.token = bearerHeader.split(' ')[1];
  next();
}
