"use client";
import Image from "next/image";
import css from "./productList.module.css";
import React, {  useEffect, useState } from "react";
import Feedback from "./feedback";
import FeedbackError from "./feedbackerror";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CARD } from "../../../graphql/query";
import Link from "next/link";

function ProductList() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showerror, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { data, loading, error } = useQuery(GET_PRODUCT_CARD);
  const products = data?.products;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(false);
      setShowError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showFeedback, showerror]);

  function submited(e) {
    e.preventDefault();
    console.log(inpRef.current.value);
    if (inpRef.current.value) {
      setShowFeedback(true);
    } else {
      setShowError(true);
    }
  }

  const Card = React.memo((props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
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
              onLoad={() => setLoaded(true)}
            />
            <div className={css.otherdiv}>
              <Link className={css.a1} href="product/${props.id}">
                Buy Now
              </Link>
              <Link className={css.a2} href="#">
                See More
              </Link>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  if (loading) {
    return <p className="ml-[900px] text-4xl">Loading...</p>;
  }

  if (error) {
    return <p>this bullshit doesnt work </p>;
    console.log(error);
  }

  const Clothes = products.filter((product) => product.category === "clothes");
  const Electronics = products.filter(
    (product) => product.category === "electronics"
  );
  const Jewlery = products.filter((product) => product.category === "jewlery");

  return (
    <div className={css.thediv}>
      <section className={css.section}>
        <h1 className={css.h1}>Man & Woman Fashion</h1>

        <div className={css.maindiv}>
          {Clothes.map((product) => {
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
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Electronics</h1>

        <div className={css.maindiv}>
          {Electronics.map((product) => {
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
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Jewellery</h1>

        <div className={css.maindiv}>
          {Jewlery.map((product) => {
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
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      <section className={css.sectionBlack}>
        <h1 className={css.h1B}>Eflier</h1>

        <div className={css.inputdiv}>
          <input type="text" placeholder="Your Email" />
          <button onClick={submited}>SUBSCRIBE</button>
        </div>

        <div>
          <ul>
            <li className={css.li}>
              <a href="#">Best Sellers</a>
            </li>
            <li className={css.li}>
              <a href="#">Gift Ideas</a>
            </li>
            <li className={css.li}>
              <a href="#">New Releases</a>
            </li>
            <li className={css.li}>
              <a href="#">Today's Deals</a>
            </li>
            <li className={css.li}>
              <a href="#">Customer Service</a>
            </li>
          </ul>
        </div>

        <div>
          <p>Help Line Number : +1 1800 1200 1200</p>
        </div>

        <div>
          <p>© 2020 All Rights Reserved. Design by Free html Templates</p>
        </div>

        {showFeedback && <Feedback />}
        {showerror && <FeedbackError />}
      </section>
    </div>
  );
}

export default ProductList;
