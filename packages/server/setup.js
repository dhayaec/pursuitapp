require('ts-node/register');

const { connectTestDb } = require('./src/db');

module.exports = async () => {
  const c = connectTestDb(true);
  global.__DB__ = c;
  return c;
};
