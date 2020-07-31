const fs = require('fs');
const conf = require('ini');
const pug = require('pug');

let config = conf.parse(fs.readFileSync('/home/kantegory/work/arkterm/config/config.ini', 'utf-8'));

let picDir = config.common.pic_dir;
let viewsDir = config.common.views_dir;
let buildDir = config.common.build_dir;

fs.readdir(picDir, function(err, files) {
    let html = pug.renderFile(
        `${viewsDir}/index.pug`,
        {
            directory: picDir,
            images: files
        }
    )

    fs.writeFileSync(`${buildDir}/index.html`, html);
});

