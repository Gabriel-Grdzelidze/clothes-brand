"use client";
import css from "./add-product.module.css";
import { useState } from "react";
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothes");
  function imgpath(img) {
    const path = `/${img}`;
    return path;
  }

  async function AddProductHandler(e) {
    console.log(category, name, price, description, img1, img2, img3);

    const path1 = imgpath(img1);
    const path2 = imgpath(img2);
    const path3 = imgpath(img3);

    fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: price.toString(),
        img1: path1,
        img2: path2,
        img3: path3,
        description,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${errorText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    });
  }

  return (
    <div className={css.thediv}>
      <form onSubmit={AddProductHandler}>
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products Price($)</label>
              <input
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(1)</label>
              <input
                onChange={(e) => {
                  setImg1(e.target.value);
                }}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products image URL(2)</label>
              <input
                onChange={(e) => {
                  setImg2(e.target.value);
                }}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products image URL(3)</label>
              <input
                onChange={(e) => {
                  setImg3(e.target.value);
                }}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>
            <div className={css.inpbox}>
              <label>Products Description</label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
