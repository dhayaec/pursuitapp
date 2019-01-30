import { connectTestDb } from '../db';

connectTestDb(true)
  .then(c => {
    console.log(c.name + ' Connected');
    process.exit();
  })
  .catch(err => {
    console.log('setup connection error');
    console.log(err);
  });
