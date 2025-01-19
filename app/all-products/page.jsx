"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import css from "./allProducts.module.css";
import ".././globals.css";

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchdata() {
      try {
        const result = await fetch("/api/products");
        if (!result.ok) {
          return console.error(error);
        }
        const data = await result.json();
        setAllProducts(data);
      } finally {
        setIsLoading(false);
      }
    }

    fetchdata();
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
              <span className={css.span2}>{props.price}</span>
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

  if (isLoading) {
    return <p>Loading All Products...</p>;
  }

  return (
    <div>
      <div className={css.topHDiv}>
        {" "}
        <h1 className={css.topH}>All Products</h1>
        
      </div>
      <div className="grid grid-cols-4 ">
        {allProducts.map((product) => {
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
        })}
      </div>
    </div>
  );
}

export default AllProducts;
