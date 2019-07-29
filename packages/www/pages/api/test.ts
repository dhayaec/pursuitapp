import { NextApiRequest, NextApiResponse } from 'next';

const randomNumber = () => Math.random() * 100;

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ name: 'Next js', number: randomNumber() }));
};
