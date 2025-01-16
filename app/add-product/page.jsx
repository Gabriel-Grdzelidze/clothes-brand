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

  const parsedPrise = parseFloat(price)

  async function AddProductHandler(e) {
    e.preventDefault();

    fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: parseFloat(price), // Make sure the price is parsed as a float
        img1,
        img2,
        img3,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API error");
        }
        return response.json();  // Only parse JSON if the response is OK
      })
      .then((data) => {
        console.log("Product added:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  }

  return (
    <div className={css.thediv}>
      <form onSubmit={AddProductHandler}>
        <div className={css.motherdiv}>
          <h1 className={css.h1}>Add Product</h1>
          <div className={css.row}>
            <div className={css.inpbox}>
              <label>Products Name</label>
              <input
                onChange={(e) => {setName(e.target.value)}}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products Price($)</label>
              <input
                onChange={(e) => {setPrice(e.target.value)}}
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
                onChange={(e) => {setImg1(e.target.value)}}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>

            <div className={css.inpbox}>
              <label>Products image URL(2)</label>
              <input
                onChange={(e) =>{ setImg2(e.target.value)}}
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
                onChange={(e) => {setImg3(e.target.value)}}
                className=""
                type="text"
                placeholder="Type Here"
              />
            </div>
            <div className={css.inpbox}>
              <label>Products Description</label>
              <textarea
                onChange={(e) =>{ setDescription(e.target.value)}}
                placeholder="Type Here"
              ></textarea>
            </div>
          </div>{" "}
          <button className={css.button} type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
