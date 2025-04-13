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
  const [loading, setLoading] = useState(false);

  const [addProduct] = useMutation(ADD_PRODUCT);
 

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!img2 || !(img2 instanceof File)) {
      console.error("Invalid img2 file:", img2);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", img2);
  
    try {
      const res = await fetch("/api/s3-apload", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        const errorResponse = await res.json();
        console.error("Error uploading file: Response not OK", errorResponse);
        return;
      }
  
      const responseBody = await res.json();
      console.log("File upload successful. Response:", responseBody);
  
      const fileUrl = responseBody?.fileUrl;
  
      if (typeof fileUrl !== 'string') {
        console.error("Invalid file URL:", fileUrl);
        return;
      }
  
      await addProduct({
        variables: {
          title,
          price: parseFloat(price),
          mainImg,
          img1,
          img2: fileUrl,
          description,
          category,
        },
      });
  
      router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setLoading(false);
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
                onChange={(e) => setImg3(e.target.files[0])}
                type="file"
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
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
