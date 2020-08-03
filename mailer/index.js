const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

const http = require('http');
const fs = require('fs');
const conf = require('ini');
const sendMsg = require('./mailer');

server.listen(8081);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'document/html' });
  res.write('<h1>It works!</h1>');
  res.end();
})

app.post('/sendmsg', (req, res) => {
  let body = req.body;
  let msg = body.msg;

  if (!msg.length) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.write('{"success": false}');
    res.end();
    return;
  }

  sendMsg(msg);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"success": true}');
  res.end();
})
