init:
	sudo apt-get update && \
	sudo apt-get upgrade && \
	sudo apt-get install curl && \
	curl -s https://raw.githubusercontent.com/Etersoft/eepm/master/packed/epm.sh | bash /dev/stdin ei --auto && \
	epmi nginx && \
	epmi npm && \
	epmi node && \
	sudo npm i pug-cli -g && \
	sudo nano config/config.ini && \
	cd server && npm i && \
	cd ../client && npm i && \
	cd ../server && sudo chmod u+x scripts/update.sh && \
	cd ../server && sudo ./scripts/update.sh
deploy:
	sudo nano deploy/nginx.conf && \
	sudo cp deploy/nginx.conf /etc/nginx/sites-enabled/ && \
	sudo cp deploy/arkterm-server.service /etc/systemd/system/ && \
	serv arkterm-server on && \
	serv arkterm-server start && \
	serv nginx on && \
	serv nginx restart

