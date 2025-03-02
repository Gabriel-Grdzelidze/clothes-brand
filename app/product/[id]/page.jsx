'use client'
import DetailPage from './component';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../../graphql/query';
import { useParams } from 'next/navigation';



export function ProductDetailPage() {
  const { id } =useParams();

const {data , loading , error}=useQuery(GET_PRODUCT ,{
  variables:{id}
})

const product = data?.product

 
   if(error){
    return <p>Something went wrong <span>{error}</span></p>
  }


  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <DetailPage data={product} />
    </div>
  );
}

export default ProductDetailPage