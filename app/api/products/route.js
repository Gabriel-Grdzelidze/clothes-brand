import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(
      JSON.stringify({ message: 'Error: ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return new Response('Failed to create user', { status: 500 });
  }
}
