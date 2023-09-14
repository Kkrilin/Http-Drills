/* Node.js static file web server */
const express = require('express');
const app = express();

// Importing necessary modules
const http = require('http');

const fs = require('fs');
const crypto = require('crypto');
// const path = require('path');

// Import the express module

// Instantiate an Express application

// ststusCode
// console.log(http.STATUS_CODES);

// Port on which the server will create
const port = 8000;
// const host = 'localhost';
const mimeType = {
  '.html': 'text/html',
  '.json': 'application/json',
};

const html = `<h1>Hello World !</h1>
              <a href = "html">html</a>
              <a href = "json">json</a>
              <a href = "uuid">uuid</a>`;

app.get('/', (req, res) => {
  res.send(html);
});

app.get('/:path', (req, res) => {
  const path = req.params.path;

  if (path === 'html' || path === 'json') {
    res.setHeader('Content-Type', mimeType[`.${path}`]);
    fs.readFile(`../public/index.${path}`, 'utf-8', (err, data) => {
      if (err) {
        res.status(500).send('Error in getting the file');
        throw err;
      } else {
        res.send(data);
      }
    });
  }
  if (path.includes('uuid')) {
    res.setHeader('Content-Type', mimeType['.json']);

    res.send(JSON.stringify({ uuid: crypto.randomUUID() }));
  }
});

app.get('/:path/:num', (req, res) => {
  const path = req.params.path;
  const num = req.params.num;

  if (path.includes('status')) {
    // const num = path.split('/')[1];
    res.send(http.STATUS_CODES[num]);
  } else if (path.includes('delay')) {
    // const num = path.split('/')[1];
    setTimeout(() => {
      res.send(http.STATUS_CODES[200]);
    }, 1000 * num);
  } else {
    res.status(500).send('Invalid path');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
