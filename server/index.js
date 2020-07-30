const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const conf = require('ini');
const shell = require('shelljs');

let config = conf.parse(fs.readFileSync('config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let scriptsDir = config.common.scripts_dir;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = picDir + '/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
        shell.exec(`${scriptsDir}/update.sh`);
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 
