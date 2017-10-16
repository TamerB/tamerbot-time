require('dotenv').config();
const bunyan = require('bunyan');
const serviceAcessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 23);


const log = {
  development: () => {
    return bunyan.createLogger({name: 'tamerbot-time-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'tamerbot-time-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'tamerbot-time-test', level: 'fatal'});
  }
};

module.exports = {
  google_time_api_key: process.env.GOOGLE_TIME_API_KEY,
  google_geo_api_key: process.env.GOOGLE_GEO_API_KEY,
  tamerbotApiToken: process.env.TAMERBOT_API_TOKEN,
  serviceAccessToken: serviceAcessToken,
  log: (env) => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};
