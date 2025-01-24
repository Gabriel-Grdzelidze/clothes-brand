import { PrismaClient } from '@prisma/client';
import DetailPage from './component';

const prisma = new PrismaClient();

export default async function ProductDetailPage({ params }) {
  const { url } =await params;

  const product = await prisma.product.findUnique({
    where: { url },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <DetailPage data={product} />
    </div>
  );
}
