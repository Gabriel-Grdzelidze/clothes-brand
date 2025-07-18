"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import css from "./allProducts.module.css";
import ".././globals.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/query";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function AllProducts() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [pagitionIndex, setPaginationIndex] = useState({ first: 0, last: 6 });

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  const paginationRight = (setIndex, index, total) => {
    if (index.last < total) {
      setIndex({
        first: index.first + 3,
        last: index.last + 3,
      });
    }
  };

  const paginationLeft = (setIndex, index) => {
    if (index.first > 0) {
      setIndex({
        first: index.first - 3,
        last: index.last - 3,
      });
    }
  };

  useEffect(() => {
    const products = data?.products || [];
    setProducts(products);
  }, [data]);

  const Card = (props) => {
    return (
      <div>
        <Link key={props.id} href={`product/${props.id}`}>
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
            />
            <div className={css.otherdiv}>
              <p className={css.a1} href="product/${props.id}">
                Buy Now
              </p>
              <p className={css.a2} href="#">
                See More
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        {" "}
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
        </div>{" "}
        <p>Loading data...</p>
      </div>
    );
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }
  const Clothes = products.filter((product) => product.category === "clothes");
  const Electronics = products.filter(
    (product) => product.category === "electronic"
  );
  const Jewlery = products.filter((product) => product.category === "jewlery");
  const sorted = products.slice().sort((a, b) => b.price - a.price);
  const reverceFilter = sorted.slice().reverse();
  console.log(Clothes, Electronics, Jewlery);
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

      <div className="grid grid-cols-3 ml-56 overflow-y-auto h-[80vh]">
        {category === "all"
          ? products
              .slice(pagitionIndex.first, pagitionIndex.last)
              .map((product) => {
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
          ? Clothes.map((product) => {
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
          ? Electronics.slice(pagitionIndex.first, pagitionIndex.last).map(
              (product) => {
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
              }
            )
          : undefined}

        {category === "jewllery"
          ? Jewlery.slice(pagitionIndex.first, pagitionIndex.last).map(
              (product) => {
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
              }
            )
          : undefined}

        {category === "highprice"
          ? sorted
              .slice(pagitionIndex.first, pagitionIndex.last)
              .map((product) => {
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
          ? reverceFilter
              .slice(pagitionIndex.first, pagitionIndex.last)
              .map((product) => {
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
      <div className={css.icons}>
        <button
          className={css.icon}
          onClick={() => paginationLeft(setPaginationIndex, pagitionIndex)}
        >
          <FaArrowLeft />
        </button>
        <button
          className={css.icon}
          onClick={() =>
            paginationLeft(setPaginationIndex, pagitionIndex, products.length)
          }
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
