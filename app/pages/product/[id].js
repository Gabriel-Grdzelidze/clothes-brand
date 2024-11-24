import { useRouter } from 'next/router';
import products_db from 'products-list';

const Product = ({ Product }) => {
  const router = useRouter();
  const { id } = router.query; // Getting the dynamic route parameter
  const {title , price , img } =products_db;

  if (!Product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{Product.title}</h1>
      <p>{Product.content}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  // Fetch the data based on `id`, this can be an API call or database query
  const res = await fetch(`https://jsonplaceholder.typicode.com/Products/${id}`);
  const Product = await res.json();

  return { props: { Product } };
}

export default Product;