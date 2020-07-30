const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const conf = require('ini');
const shell = require('shelljs');
const sendMsg = require('./mailer');

let config = conf.parse(fs.readFileSync('config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let scriptsDir = config.common.scripts_dir;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let oldpath = files.filetoupload.path;
      let newpath = picDir + '/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
        shell.exec(`${scriptsDir}/update.sh`);
      });
  });
  }
  else if (req.url == '/sendmsg') {
    let msg = '';

    req.on('data', chunk => {
        msg += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      msg = JSON.parse(msg);
      msg = msg.msg;

      if (!msg.length) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write('{"success": false}');
        res.end();
        return;
      }

      sendMsg(msg);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('{"success": true}');
      res.end();
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');

    res.write('<form accept-charset="utf-8" action="sendmsg" method="post">');
    res.write('<textarea name="msg"></textarea><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 
