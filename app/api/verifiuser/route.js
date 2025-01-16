import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = password === user.password;

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Verification successful' });

  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
