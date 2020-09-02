const fs = require('fs');
const conf = require('ini');
const pug = require('pug');

let config = conf.parse(fs.readFileSync('/var/www/html/arkterm/config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let viewsDir = config.common.views_dir;
let buildDir = config.common.build_dir;

let portfolioDir = '/var/www/html/arkterm/client/dist/views/images/portfolio/';

let portfolio = [];

let portfolioFiles = fs.readdirSync(portfolioDir);

for (let i = 0; i < portfolioFiles.length; i++) {
  let counter = i + 1;
  if (counter % 4 === 0) {
    portfolio.push(portfolioFiles.slice(counter - 4, counter));
  }
}

let sliderPicsDir = '/var/www/html/arkterm/client/dist/views/images/slider/pics/';
let sliderDescDir = '/var/www/html/arkterm/client/dist/views/images/slider/desc/';

let sliderItems = [];

let sliderPics = fs.readdirSync(sliderPicsDir);

for (let _file of sliderPics) {
  sliderItems.push([_file]);
}

let sliderDesc = fs.readdirSync(sliderDescDir);

for (let _desc of sliderDesc) {
  let text = fs.readFileSync(`${sliderDescDir}/${_desc}`, 'utf-8');
  text = text.toString();

  sliderItems[sliderDesc.indexOf(_desc)].push(text);
}

console.log('sliderItems', sliderItems);

let html = pug.renderFile(
  `${viewsDir}/index.pug`, {
    sliderItems: sliderItems,
    portfolio: portfolio
  }
)

fs.writeFileSync(`${buildDir}/index.html`, html);
