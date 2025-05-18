"use client";
import { useMutation } from "@apollo/client";
import css from "./add-product.module.css";
import { useState } from "react";
import { ADD_PRODUCT } from "../../graphql/mutations";
import Feedback from "../components/productList/feedback";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mainImg, setMainImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothes");
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!(mainImg instanceof File) || !(img1 instanceof File) || !(img2 instanceof File)) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", mainImg);
    formData.append("file", img1);
    formData.append("file", img2);

    try {
      const res = await fetch("/api/s3-apload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const { urls } = await res.json();

      if (!urls || urls.length < 3) {
        setLoading(false);
        return;
      }

      const [mainImgUrl, img1Url, img2Url] = urls;

      await addProduct({
        variables: {
          title,
          price: parseFloat(price),
          mainImg: mainImgUrl,
          img1: img1Url,
          img2: img2Url,
          description,
          category,
        },
      });

      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);

      setTitle("");
      setPrice("");
      setMainImg(null);
      setImg1(null);
      setImg2(null);
      setDescription("");
      setCategory("clothes");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.thediv}>
      <form onSubmit={handleAddProduct}>
        <div className={css.motherdiv}>
          <div className="flex justify-center text-center">
            <h1 className={css.h1}>Add Product</h1>
          </div>

          <div className={css.select}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="clothes">Clothes</option>
              <option value="electronic">Electronic</option>
              <option value="jewlery">Jewlery</option>
            </select>
          </div>

          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
            </div>
            <div className={css.inpbox}>
              <label>Products Price($)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(1)</label>
              <input onChange={(e) => setMainImg(e.target.files[0])} type="file" />
            </div>
            <div className={css.inpbox}>
              <label>Products image URL(2)</label>
              <input onChange={(e) => setImg1(e.target.files[0])} type="file" />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(3)</label>
              <input onChange={(e) => setImg2(e.target.files[0])} type="file" />
            </div>
            <div className={css.inpbox}>
              <label>Products Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-center text-center">
            <button className={css.button} type="submit">
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
      <div style={{zIndex:100}}>
        {showFeedback && <Feedback message={"successfuly added product"} />}
      </div>
    </div>
  );
}

export default AddProduct;
