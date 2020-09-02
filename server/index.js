const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const conf = require('ini');
const shell = require('shelljs');

// let confPath = '../config/config.dev.ini';
let confPath = '../config/config.ini';
let config = conf.parse(fs.readFileSync(confPath, 'utf-8'));

let picDir = config.common.pic_dir;
let buildDir = config.common.build_dir;
let scriptsDir = config.common.scripts_dir;

const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  challenge: true,
  users: { 'admin': 'rss178' }
}))

const getImgs = () => {
  let res = fs.readdirSync(picDir);

  console.log(res);

  return res;
}

const getSliderImgs = () => {
  let res = fs.readdirSync('/var/www/html/arkterm/client/dist/views/images/slider/pics')

  return res;
}

const getSliderDesc = () => {
  let res = fs.readdirSync('/var/www/html/arkterm/client/dist/views/images/slider/desc')

  let _res = [];

  for (let _file of res) {
    _res.push(fs.readFileSync(`/var/www/html/arkterm/client/dist/views/images/slider/desc/${_file}`, 'utf-8'))
  }

  return _res;
}

server.listen(8080);

app.use(express.static(`/var/www/html/arkterm/client/dist/views/images/`));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/imgs', (req, res) => {
  let imgs = JSON.stringify(getImgs());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"imgs":' + imgs + '}');
  res.end();
})

app.get('/getEmail', (req, res) => {
  let email = JSON.stringify({ email: config.mailer.dest });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(email);
  res.end();
})

app.post('/updateEmail', (req, res) => {
  let body = req.body;
  let email = body.email;

  config.mailer.dest = email;
  fs.writeFileSync(confPath, conf.stringify(config));

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"success": true}');
  res.end();
})

app.post('/delImg', (req, res) => {
  let body = req.body;

  console.log(body);
  let img = body.img;
  console.log(img);
  let path = `${picDir}/${img}`;

  fs.unlinkSync(path);
  shell.exec(`${scriptsDir}/update.sh`)

  res.end();
})

app.post('/changeImg', (req, res) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    let img = fields.img;

    let path = `${picDir}/${img}`;
    fs.unlinkSync(path);
    let oldpath = files.file.path;
    let newpath = `${picDir}/${img}`;

    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
      shell.exec(`${scriptsDir}/update.sh`)
    })
  })
})

app.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    let img = `${getImgs().length}`;

    img = img.length < 2 ? `0${img}` : img;

    let ext = files.file.name.split('.').pop();

    let oldpath = files.file.path;
    let newpath = `${picDir}/${img}.${ext}`;

    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
      shell.exec(`${scriptsDir}/update.sh`)
    })
  })

})

app.get('/slider/imgs', (req, res) => {
  let imgs = JSON.stringify(getSliderImgs());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"imgs":' + imgs + '}');
  res.end();
})

app.post('/sld/delImg', (req, res) => {
  let body = req.body;

  console.log(body);
  let img = body.img;
  console.log(img);
  let path = `/var/www/html/arkterm/client/dist/views/images/slider/pics/${img}`;

  fs.unlinkSync(path);
  shell.exec(`${scriptsDir}/update.sh`)

  res.end();
})

app.post('/sld/changeImg', (req, res) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    let img = fields.img;

    let path = `/var/www/html/arkterm/client/dist/views/images/slider/pics/${img}`;
    fs.unlinkSync(path);
    let oldpath = files.file.path;
    let newpath = `/var/www/html/arkterm/client/dist/views/images/slider/pics/${img}`;

    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
      shell.exec(`${scriptsDir}/update.sh`)
    })
  })
})

app.post('/sld/upload', (req, res) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    let img = `${getImgs().length}`;

    img = img.length < 2 ? `0${img}` : img;

    let ext = files.file.name.split('.').pop();

    let oldpath = files.file.path;
    let newpath = `/var/www/html/arkterm/client/dist/views/images/slider/pics/${img}.${ext}`;

    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
      shell.exec(`${scriptsDir}/update.sh`)
    })
  })

})

app.get('/slider/descr', (req, res) => {
  let desc = JSON.stringify(getSliderDesc());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"desc":' + desc + '}');
  res.end();
})

app.post('/save/descr', (req, res) => {
  let filename = req.filename;
  let newVal = req.newVal;

  fs.writeFileSync(`/var/www/html/arkterm/client/dist/views/images/slider/desc/${filename}`, newVal);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('{"success": true}');
  res.end();
})

app.post('/sld/add/descr', (req, res) => {
  let filename = `${getSliderDesc().length + 1}`;
  filename = filename.length < 2 ? `0${filename}` : filename;

  let ext = 'txt';

  let descrText = req.descrText;
  let newpath = `/var/www/html/arkterm/client/dist/views/images/slider/pics/${filename}.${ext}`;

  fs.writeFileSync(`/var/www/html/arkterm/client/dist/views/images/slider/desc/${newpath}`, descrText);
})
