import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET() {
    try {
      const products = await prisma.product.findMany({
        where: {
          category:'jewlery'
        }
      });
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