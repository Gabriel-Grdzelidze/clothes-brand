import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, price, description, img1, img2, img3 } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        title: name,
        price,
        description,
        mainImg: img1,
        img1: img2,
        img2: img3,
        url: name,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Data Updated successfully",
        product: updateProduct,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to update product",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
