"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import css from "./allProducts.module.css";
import ".././globals.css";

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clothesProducts, setClothesProducts] = useState([]);
  const [electronicsProducts, setelectronicsProducts] = useState([]);
  const [jewleryProducts, setjewleryProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function allProducts() {
      const result = await fetch("/api/products");
      const data = await result.json();
      setAllProducts(data);
      setIsLoading(false);
    }

    async function clothesProducts() {
      const result = await fetch("/api/verifiuser");
      const data = await result.json();
      setClothesProducts(data);
      setIsLoading(false);
    }

    async function electronicProducts() {
      const result = await fetch("/api/addproduct");
      const data = await result.json();
      setelectronicsProducts(data);
      setIsLoading(false);
    }

    async function jewleryProducts() {
      const result = await fetch("/api/jewleryProducts");
      const data = await result.json();
      setjewleryProducts(data);
      setIsLoading(false);
    }

    async function filteredProducts() {
      const result = await fetch("/api/delete", {
        method: "GET",
      });
      const data = await result.json();
      setFiltered(data);
      setIsLoading(false);
    }

    allProducts();
    electronicProducts();
    clothesProducts();
    jewleryProducts();
    filteredProducts();
  }, []);

  const Card = React.memo((props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div>
        <a key={props.id} href={`product/${props.url}`}>
          <div className={css.card}>
            <h1 className={css.cardTitle}>{props.title}</h1>
            <p>
              <span className={css.span1}>Price</span>{" "}
              <span className={css.span2}>{props.price}$</span>
            </p>
            <Image
              className={css.img}
              src={props.img}
              alt={props.title}
              width={200}
              height={150}
              onLoad={() => setLoaded(true)}
            />
            <div className={css.otherdiv}>
              <a className={css.a1} href="product/${props.id}">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>
        </a>
      </div>
    );
  });

  const reverceFilter = filtered.slice().reverse();

  return (
    <div className="h-screen">
      <div className={css.topHDiv}>
        {" "}
        <h1 className={css.topH}>All Products</h1>
        <div className={css.selectDiv}>
          <label>Filter:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Clothes">clothes</option>
            <option value="electronics">Electronics</option>
            <option value="jewllery">Jewllery</option>
            <option value="highprice">By price(High to low)</option>
            <option value="lowprice">By price(Low to high)</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <p>Loading Data...</p>
      ) : (
        <div className="grid grid-cols-4 overflow-y-auto h-[80vh]">
          {isLoading && <p>Loading Data...</p>}
          {category === "all"
            ? allProducts.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}

          {category === "Clothes"
            ? clothesProducts.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}

          {category === "electronics"
            ? electronicsProducts.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}

          {category === "jewllery"
            ? jewleryProducts.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}

          {category === "highprice"
            ? filtered.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}

          {category === "lowprice"
            ? reverceFilter.map((product) => {
                return (
                  <Card
                    key={product.id}
                    url={product.url}
                    title={product.title}
                    img={product.mainImg}
                    id={product.id}
                    price={product.price}
                  />
                );
              })
            : undefined}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
