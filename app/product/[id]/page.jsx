// app/products/[id]/page.jsx
import fs from "fs";
import path from "path";
import Example from "./component";

async function getProductData(id) {
  const dataPath = path.join(process.cwd(), "data", "products-list.json");
  const fileContent = fs.readFileSync(dataPath);
  const products = JSON.parse(fileContent);

  return products.find((product) => product.id === id);
}

export async function generateStaticParams() {
  // Path to the JSON file
  const dataPath = path.join(process.cwd(), "data", "products-list.json");
  const fileContent = fs.readFileSync(dataPath);
  const products = JSON.parse(fileContent);

  // Generate dynamic paths
  return products.map((product) => ({
    id: product.id, // Define the dynamic part here
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params; // Extract dynamic `id` from the URL
  const product = await getProductData(id);

  // If no product is found, return a 404
  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <Example
      mainImg={product.mainImg}
      img1={product.img1}
      img2={product.img2}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  );
}
