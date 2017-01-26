var fs = require('fs');
var path = require('path');
var dotenv = require('dotenv-safe');


module.exports = function(envPath) {

  var envExists = fs.existsSync( envPath );
  
  if (!envExists) {
    console.log('.env file not found');
    return false;
  }

  var envs = dotenv.parse(fs.readFileSync(envPath));
  var parsedEnvs = {};
  const ignoredKeys = ['AUTH0_SECRET', 'DB_URL', 'DB_USER', 'DB_PASS'];
  const isProduction = process.env.NODE_ENV === 'production';

  for (var key in envs) {
    if ( ignoredKeys.indexOf(key) >= 0  && isProduction) continue;
    parsedEnvs[key] = JSON.stringify(envs[key]);
  }

  return parsedEnvs;

};