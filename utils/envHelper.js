var fs = require('fs');
var dotenv = require('dotenv-safe');


module.exports = function(envPath) {

  var envExists = fs.existsSync( envPath );
  
  if (!envExists) {
    console.log('.env file not found');
    return false;
  }

  var envs = dotenv.parse(fs.readFileSync('./.env'));
  var parsedEnvs = {};

  for (var key in envs) {
    parsedEnvs[key] = JSON.stringify(envs[key]);
  }

  return parsedEnvs;

};