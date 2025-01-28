"use client";
import css from "./Inventory.module.css";
import css2 from "./update.module.css";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { MdEditNote } from "react-icons/md";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [clothesProducts, setClothesProducts] = useState([]);
  const [electronicsProducts, setelectronicsProducts] = useState([]);
  const [jewleryProducts, setjewleryProducts] = useState([]);
  const [isLoading, setIsloadin] = useState(true);
  const [all, setAll] = useState(true);
  const [Clothes, setClothes] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [jewlery, setJewlery] = useState(false);
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  function allActive() {
    setAll(true);
    setClothes(false);
    setElectronics(false);
    setJewlery(false);
  }

  function clothesActive() {
    setAll(false);
    setClothes(true);
    setElectronics(false);
    setJewlery(false);
  }

  function electronicsActive() {
    setAll(false);
    setClothes(false);
    setElectronics(true);
    setJewlery(false);
  }

  function jewleryActive() {
    setAll(false);
    setClothes(false);
    setElectronics(false);
    setJewlery(true);
  }

  useEffect(() => {
    async function allProducts() {
      const result = await fetch("/api/products");
      const data = await result.json();
      setInventory(data);
      setIsloadin(false);
    }

    async function clothesProducts() {
      const result = await fetch("/api/verifiuser");
      const data = await result.json();
      setClothesProducts(data);
      setIsloadin(false);
    }

    async function electronicProducts() {
      const result = await fetch("/api/addproduct");
      const data = await result.json();
      setelectronicsProducts(data);
      setIsloadin(false);
    }

    async function jewleryProducts() {
      const result = await fetch("/api/jewleryProducts");
      const data = await result.json();
      setjewleryProducts(data);
      setIsloadin(false);
    }

    allProducts();
    electronicProducts();
    clothesProducts();
    jewleryProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  async function getOneProduct(id) {
    const result = await fetch(`/api/get-product`,{
      body : JSON.stringify({
        id
      }),
      method : "GET"
    });
    const data = result.json();
    if (data.ok) {
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setImg1(data.mainImg);
      setImg2(data.img1);
      setImg3(data.img2);
    }
  }

  const handleUpdate =  (id) => {
    setUpdate(true);
    getOneProduct(id);
  };

  const Card = (props) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={css.card}
      >
        <p>
          <span className={css.span}>
            Name<span className={css.span}></span>
          </span>{" "}
          : {props.name}
        </p>
        <p>
          <span className={css.span}>Price</span> : {props.price}$
        </p>
        <p>
          <span className={css.span}>Image1</span>: {props.mainimg}
        </p>
        <p>
          <span className={css.span}>Image2</span> : {props.img1}
        </p>
        <p>
          <span className={css.span}>Image3</span> : {props.img2}{" "}
        </p>
        <p>
          <span className={css.span}>Description</span> : {props.description}{" "}
        </p>
        {hover && (
          <button className={css.deleteButton} onClick={props.onDelete}>
            <MdDelete />
          </button>
        )}
         {hover && (
          <button className={css.updateButton} onClick={props.onUpdate}>
           <MdEditNote />
          </button>
        )}
      </div>
    );
  };

  if (update) {
    return (
      <div className={css2.thediv}>
        <IoMdExit onClick={setUpdate(false)} />
        <form>
          <div className={css2.motherdiv}>
            <h1 className={css2.h1}>Update Data</h1>
            <div className={css2.row}>
              <div className={css2.inpbox}>
                <label>Products Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Type Here"
                />
              </div>

              <div className={css2.inpbox}>
                <label>Products Price($)</label>
                <input
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  type="text"
                  placeholder="Type Here"
                />
              </div>
            </div>
            <div className={css2.row}>
              <div className={css2.inpbox}>
                <label>Products image URL(1)</label>
                <input
                  onChange={(e) => {
                    setImg1(e.target.value);
                  }}
                  value={img1}
                  type="text"
                  placeholder="Type Here"
                />
              </div>

              <div className={css2.inpbox}>
                <label>Products image URL(2)</label>
                <input
                  onChange={(e) => {
                    setImg2(e.target.value);
                  }}
                  value={img2}
                  type="text"
                  placeholder="Type Here"
                />
              </div>
            </div>
            <div className={css2.row}>
              <div className={css2.inpbox}>
                <label>Products image URL(3)</label>
                <input
                  onChange={(e) => {
                    setImg3(e.target.value);
                  }}
                  value={img3}
                  type="text"
                  placeholder="Type Here"
                />
              </div>
              <div className={css2.inpbox}>
                <label>Products Description</label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  placeholder="Type Here"
                ></textarea>
              </div>
            </div>
            <button className={css2.button} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className={css.title}>Inventory</h1>
      <div className={css.topdiv}>
        <div className={css.categoryBox}>
          <h1>Select Category</h1>
          <ul>
            <li onClick={allActive} className={all ? css.liActive : undefined}>
              All
            </li>
            <li
              onClick={clothesActive}
              className={Clothes ? css.liActive : undefined}
            >
              Clothes
            </li>
            <li
              onClick={electronicsActive}
              className={electronics ? css.liActive : undefined}
            >
              Electronics
            </li>
            <li
              onClick={jewleryActive}
              className={jewlery ? css.liActive : undefined}
            >
              Jewlery
            </li>
          </ul>
        </div>

        <div>
          <a className={css.buttona} href="add-product">
            Add Product
          </a>
        </div>
      </div>

      <div>
        {isLoading && <p>Loading Data...</p>}
        {all &&
          inventory.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() => handleDelete(product.id)}
                onUpdate={() => handleUpdate(product.id)}
              />
            );
          })}

        {Clothes &&
          clothesProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() => handleDelete(product.id)}
              />
            );
          })}

        {electronics &&
          electronicsProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() => handleDelete(product.id)}
              />
            );
          })}

        {jewlery &&
          jewleryProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() => handleDelete(product.id)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Inventory;
