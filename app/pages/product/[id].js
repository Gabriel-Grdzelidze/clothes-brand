import { useRouter } from 'next/router';

const Product = ({ Product }) => {
  const router = useRouter();
  const { id } = router.query; // Getting the dynamic route parameter

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