import { PrismaClient } from '@prisma/client';
import DetailPage from './component';

const prisma = new PrismaClient();

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    return <DetailPage data={product} />;
    
}
