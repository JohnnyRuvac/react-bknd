# read config file
set -o allexport
source .deploy/config
set +o allexport
 
# prepare package
mkdir -p .tmpdeploy/dist
cp -R dist/assets .tmpdeploy/dist
cp dist/index.html .tmpdeploy/dist
cp package.json .tmpdeploy/package.json
tar czf .tmpdeploy.tar.gz .tmpdeploy
rm -rf .tmpdeploy

# deploy it
scp .tmpdeploy.tar.gz $username'@'$serverIp':'$appDirectory
rm .tmpdeploy.tar.gz

# unpack, cleanup, install dependencies
ssh -t $username'@'$serverIp "cd $appDirectory && tar -zxvf .tmpdeploy.tar.gz && rm .tmpdeploy.tar.gz && rsync -a .tmpdeploy/* . && rm -rf .tmpdeploy && npm install --production && pm2 reload server"
