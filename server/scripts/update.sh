rm -rf /var/www/html/arkterm/client/dist/
mkdir /var/www/html/arkterm/client/dist/
cp -r /var/www/html/arkterm/client/src/scripts/ /var/www/html/arkterm/client/dist/scripts/
cp -r /var/www/html/arkterm/client/src/styles/ /var/www/html/arkterm/client/dist/styles/
cp -r /var/www/html/arkterm/client/src/views/ /var/www/html/arkterm/client/dist/views/
node /var/www/html/arkterm/client/src/scripts/index.js
