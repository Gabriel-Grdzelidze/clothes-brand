import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    const{id} = req.json()
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    return new Response({ status: 200 }, JSON.stringify(product));
  } catch (error) {
    return new Response({ status: 500 });
  }
}
