"use client";
import { useMutation } from "@apollo/client";
import css from "./add-product.module.css";
import { useState } from "react";
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../../graphql/mutations";
import { useRouter } from "next/navigation";

function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mainImg, setImg1] = useState("");
  const [img1, setImg2] = useState("");
  const [img2, setImg3] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothes");

  const [addProduct] = useMutation(ADD_PRODUCT);
  

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        variables: {
          title,
          price: parseFloat(price), // ✅ Corrected to Float
          mainImg,
          img1,
          img2,
          description,
          category, // ✅ No duplicate
        }
      });
      router.push('/dashboard'); // ✅ Navigate after mutation
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  return (
    <div className={css.thediv}>
      <form onSubmit={handleAddProduct}>
        <div className={css.motherdiv}>
          <h1 className={css.h1}>Add Product</h1>

          <div className={css.select}>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="clothes">Clothes</option>
              <option value="electronic">Electronic</option>
              <option value="jewlery">Jewlery</option>
            </select>
          </div>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products Name</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products Price($)</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(1)</label>
              <input
                onChange={(e) => setImg1(e.target.value)}
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products image URL(2)</label>
              <input
                onChange={(e) => setImg2(e.target.value)}
                type="text"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(3)</label>
              <input
                onChange={(e) => setImg3(e.target.value)}
                type="text"
                placeholder="Type Here"
              />
            </div>
            <div className={css.inpbox}>
              <label>Products Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type Here"
              ></textarea>
            </div>
          </div>
          <button className={css.button} type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
