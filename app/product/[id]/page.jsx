
// import Example from "./component";


// async function getData(id){
//   const result = await fetch("http://localhost:3000/api/products")
//   if(!result.ok){
//     throw new Error("failed to laod data...")
//   }

//   const data = await result.json()

//   return data
// }


 

// export async function generateStaticParams() {
//   const products = await getData(); 

//   return products.map((product) => ({
//     id: product.id,
//   }));
// }


// export default async function ProductPage({ params }) {
//   const { id } = await params;
//   const product = await getData(id);
//   console.log(product)

//   if (!product) {
//     return (
//       <div>
//         <h1>Product not found</h1>
//       </div>
//     );
//   }

//   return (
//     <Example
//       mainImg={product.mainImg}
//       img1={product.img1}
//       img2={product.img2}
//       title={product.title}
//       price={product.price}
//       description={product.description}
//       sizes={product.sizes} 
//     />
//   );
// }
'use client'
import DetailPage from './component';

// app/product/[id]/page.jsx
import { useEffect, useState ,use } from 'react';

const ProductPage = ({ params }) => {
  const { id } = use(params);  // Get the dynamic product ID from the URL
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`/api/productsDetail/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setData(data); // Store fetched data in state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductData();
  }, [id]); // Run this effect when the id changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data)

  return (
    <div>
      <DetailPage data={data} /> {/* Pass fetched data to Example component */}
    </div>
  );
};

export default ProductPage;
