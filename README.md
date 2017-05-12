# React-BKND

Simple backend and administration for react app.

## Installation

- clone
- yarn install (or npm install)
- create client in auth0.com for login
- define allowed callbacks in auth0.com client settings, for example http://localhost:8080/login
- copy and rename .env.sample to .env
- fill in enviroment variables in .env file (clientID, secret and domain from auth0.com)
- fill in server url, port in .env
- fill in mongo url, for example localhost:27017/appName for local mongo. Leave DB_USER and DB_PASS blank for local mongo


## Deployment

- setup server (digitalocean)
- create folder on server where app will be deployed
- copy and rename .deploy/config_example to config
- fill in server username in config, serverip, absolute path to app folder and appname
- setup reverse proxy on nginx for your domain (/etc/nginx/sites-available) (https://gist.github.com/soheilhy/8b94347ff8336d971ad0)
- deploy to server using yarn deploy command. It will fail because it won't find pm2 process of your app
- log in to server using ssh and start pm2 process of your app with specified name, for example pm2 start server/server.js --name your_app_name
