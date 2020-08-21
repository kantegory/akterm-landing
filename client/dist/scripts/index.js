const fs = require('fs');
const conf = require('ini');
const pug = require('pug');

let config = conf.parse(fs.readFileSync('/var/www/html/arkterm/config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let viewsDir = config.common.views_dir;
let buildDir = config.common.build_dir;

fs.readdir(picDir, function(err, files) {
  let images = [];
  
  console.log("files before", files);

  for (let i = 0; i < files.length; i++) {
    let counter = i + 1;
    if (counter % 4 === 0) {
      console.log('files are', files.slice(counter - 4, counter));
      images.push(files.slice(counter - 4, counter));
    }
  }

  console.log('images are', images);

  let html = pug.renderFile(
    `${viewsDir}/index.pug`, {
      directory: picDir,
      images: images,
      picPath: config.common.pic_path
    }
  )

  fs.writeFileSync(`${buildDir}/index.html`, html);
});
