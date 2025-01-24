import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Product deleted successfully", product: deletedProduct }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during deletion:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete product", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function GET(req) {
  try {
    const products = await prisma.product.findMany();
    const sortedProducts = products.sort((a, b) => Number(b.price) - Number(a.price));
    return new Response(JSON.stringify(sortedProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
