const fs = require('fs');
const conf = require('ini');
const pug = require('pug');

let config = conf.parse(fs.readFileSync('/var/www/html/arkterm/config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let viewsDir = config.common.views_dir;
let buildDir = config.common.build_dir;

let portfolioDir = '/var/www/html/arkterm/client/dist/views/images/portfolio/';

let portfolio = [];

fs.readdirSync(portfolioDir, function(err, files) {  
  for (let i = 0; i < files.length; i++) {
    let counter = i + 1;
    if (counter % 4 === 0) {
      portfolio.push(files.slice(counter - 4, counter));
    }
  }
});

let sliderPicsDir = '/var/www/html/arkterm/client/dist/views/images/slider/pics/';
let sliderDescDir = '/var/www/html/arkterm/client/dist/views/images/slider/desc/';

let sliderItems = [];

fs.readdirSync(sliderPicsDir, function(err, files) {  
  for (let _file of files) {
    sliderItems.push([_file]);
  }
});

fs.readdirSync(sliderDescDir, function(err, files) {
  for (let _desc of files) {
    sliderItems[files.indexOf(_desc)].push(_desc);
  }
})

let html = pug.renderFile(
  `${viewsDir}/index.pug`, {
    sliderItems: sliderItems,
    portfolio: portfolio
  }
)

fs.writeFileSync(`${buildDir}/index.html`, html);
