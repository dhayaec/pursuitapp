import { connectTestDb } from '../db';

connectTestDb(true)
  .then(() => process.exit())
  .catch(err => console.log(err));
