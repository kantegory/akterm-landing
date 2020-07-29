const dir = "/home/kantegory/work/arkterm/images/";
const fs = require('fs');
const pug = require('pug');

fs.readdir(dir, function(err, files) {
    let html = pug.renderFile(
        '/home/kantegory/work/arkterm/client/src/views/index.pug',
        {
            directory: dir,
            images: files
        }
    )

    // do something with html
    console.log(html);
    fs.writeFileSync('/home/kantegory/work/arkterm/client/dist/index.html', html);
});

