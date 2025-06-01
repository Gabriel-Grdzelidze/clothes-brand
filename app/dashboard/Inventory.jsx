"use client";
import css from "./Inventory.module.css";
import css2 from "./update.module.css";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/query";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../../graphql/mutations";
import Link from "next/link";
import Image from "next/image";

function Inventory() {
  const [all, setAll] = useState(true);
  const [Clothes, setClothes] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [jewlery, setJewlery] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mainImg, setImg1] = useState("");
  const [img1, setImg2] = useState("");
  const [img2, setImg3] = useState("");
  const [update, setUpdate] = useState(false);
  const [productId, setProductId] = useState("");

  const { data, error, loading } = useQuery(GET_PRODUCTS);
  const products = data?.products;

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

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        variables: {
          id: productId,
          title,
          price: parseInt(price),
          description,
          mainImg,
          img1,
          img2,
        },
      });
      setUpdate(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleEditProduct = (product) => {
    setUpdate(true);
    setTitle(product.title);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImg1(product.mainImg);
    setImg2(product.img1);
    setImg3(product.img2);
    setProductId(product.id);
  };

  const Card = (props) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          marginBottom: 20,
          marginLeft: 20,
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 10,
          gap: 20,
          maxWidth: "90%",
        }}
      >
        <div style={{ marginTop: 30 }}>
          <Image width={100} height={100} src={props.mainimg} alt="image" />
          <div className="flex">
            <Image width={50} height={50} src={props.img1} alt="image" />
            <Image width={50} height={50} src={props.img2} alt="image" />
          </div>
        </div>
        <div className={css.card}>
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
            <button
              className={css.updateButton}
              onClick={() => props.onUpdate(props.product)}
            >
              <MdEditNote />
            </button>
          )}
        </div>
      </div>
    );
  };
  if (update) {
    return (
      <div className={css2.thediv}>
        <button
          className={css2.exit}
          onClick={() => {
            setUpdate(false);
          }}
        >
          <IoMdExit />
        </button>

        <div className={css2.motherdiv}>
          <form onSubmit={handleUpdateProduct}>
            <h1 className={css2.h1}>Update Data</h1>
            <div className={css2.row}>
              <div className={css2.inpbox}>
                <label>Products Name</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Type Here"
                />
              </div>

              <div className={css2.inpbox}>
                <label>Products Price($)</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
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
                  onChange={(e) => setImg1(e.target.files[0])}
                  type="file"
                  placeholder="Type Here"
                />
              </div>

              <div className={css2.inpbox}>
                <label>Products image URL(2)</label>
                <input
                  onChange={(e) => setImg2(e.target.files[0])}
                  type="file"
                  placeholder="Type Here"
                />
              </div>
            </div>
            <div className={css2.row}>
              <div className={css2.inpbox}>
                <label>Products image URL(3)</label>
                <input
                  onChange={(e) => setImg3(e.target.files[0])}
                  type="file"
                  placeholder="Type Here"
                />
              </div>
              <div className={css2.inpbox}>
                <label>Products Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Type Here"
                ></textarea>
              </div>
            </div>

            <button className={css2.button} type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <p>Loading Data...</p>;
  const ClothesProducts = products.filter(
    (product) => product.category === "clothes"
  );
  const ElectronicsProducts = products.filter(
    (product) => product.category === "electronic"
  );
  const JewleryProducts = products.filter(
    (product) => product.category === "jewlery"
  );

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
          <Link className={css.buttona} href="add-product">
            Add Product
          </Link>
        </div>
      </div>

      <div>
        {all &&
          products.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() =>
                  deleteProduct({ variables: { id: product.id } })
                }
                onUpdate={() => handleEditProduct(product)}
                product={product}
              />
            );
          })}

        {Clothes &&
          ClothesProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() =>
                  deleteProduct({ variables: { id: product.id } })
                }
                onUpdate={() => handleEditProduct(product)}
                product={product}
              />
            );
          })}

        {electronics &&
          ElectronicsProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() =>
                  deleteProduct({ variables: { id: product.id } })
                }
                onUpdate={() => handleEditProduct(product)}
                product={product}
              />
            );
          })}

        {jewlery &&
          JewleryProducts.map((product) => {
            return (
              <Card
                name={product.title}
                price={product.price}
                mainimg={product.mainImg}
                img1={product.img1}
                img2={product.img2}
                description={product.description}
                key={product.id}
                onDelete={() =>
                  deleteProduct({ variables: { id: product.id } })
                }
              />
            );
          })}
      </div>
    </div>
  );
}

export default Inventory;