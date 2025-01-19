import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
    const { id } = req.json();
    
    console.log(`Deleting product with id: ${id}`); 
    
    if (req.method === 'DELETE') {
      try {
        const deletedProduct = await prisma.product.delete({
          where: { id: id },
        });
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
      } catch (error) {
        console.error('Error during deletion:', error); 
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
