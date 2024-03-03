import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const value = JSON.stringify(req.body.value);
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      res.status(500).json({ message: 'SECRET_KEY is not set' });
      throw new Error('SECRET_KEY is not set');
    }

    const securedValue = jwt.sign(value, secretKey);

    res.setHeader('Set-Cookie', `cookie=${securedValue}; Path=/; HttpOnly; Secure; SameSite=Strict`);
    res.status(200).json({ message: 'Cookie set' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
}
