

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function POST(req) {
  try {
    const { name, price, img1, img2, img3, description, category } = await req.json();
    const priceString = parseFloat(price).toString();

    const product = await prisma.product.create({
      data: {
        url: name,
        title: name,
        description,
        price: priceString,
        mainImg: img1,
        img1: img2,
        img2: img3,
        category,
      },
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response("Failed to add product: " + error.message, { status: 500 });
  }
}



export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category:'electronic'
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

