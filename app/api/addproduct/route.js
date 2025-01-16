// import { PrismaClient } from "@prisma/client";

// export async function POST(req) {
//   const prisma = new PrismaClient();

//   try {
//     const { name, price, img1, img2, img3, description } = await req.json();
//     const product = await prisma.product.create({
//       url: name,
//       title: name,
//       description: description,
//       price: price,
//       mainImg: img1,
//       img1: img2,
//       img2: img3,
//     });
//     return new Response(JSON.stringify(product), { status: 201 });
//   } catch (error) {
//     return new Response("Failer to add product", { status: 500 });
//   } finally {
//     prisma.$disconnect();
//   }
// }
// app/api/addproduct/route.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Logging the request body to see what we are getting
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    const { name, price, img1, img2, img3, description } = requestBody;

    // Check if price is a valid number
    if (isNaN(price)) {
      return new Response("Invalid price", { status: 400 });
    }

    // Creating the product
    const product = await prisma.product.create({
      data: {
        url: name,
        title: name,
        description: description,
        price: parseFloat(price),  // Ensuring price is a float
        mainImg: img1,
        img1: img2,
        img2: img3,
      },
    });

    console.log("Product Created:", product);  // Log the created product

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error during API request:", error);
    return new Response("Failed to add product: " + error.message, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
