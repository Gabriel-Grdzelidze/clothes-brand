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
  const clothesIndexFirst = 0;
  const clothesIndexLast = 3;
  const electronicsIndexFirst = 0;
  const electronicsIndexLast = 3;   
  const jewleryIndexFirst = 0;
  const jewleryIndexLast = 3;

  const paginationRight=(num1,num2)=>{
    num1=num1+3;
    num2=num2+3;
    console.log(num1,num2);
  }

  const paginationLeft=(num1,num2)=>{
    num1=num1-3;
    num2=num2-3;
    console.log(num1,num2);
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
    (product) => product.category === "electronic"
  );
  const Jewlery = products.filter((product) => product.category === "jewlery");

  return (
    <div className={css.thediv}>
      <section className={css.section}>
        <h1 className={css.h1}>Man & Woman Fashion</h1>

        <div className={css.maindiv}>
          {Clothes.slice(
            clothesIndexFirst,
            clothesIndexLast
          ).map((product) => {
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
          {clothesIndexFirst === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={paginationLeft(clothesIndexFirst,clothesIndexLast)} className={css.icon} />
          )}
          {clothesIndexLast > Clothes.length-4?(
            <FaArrowRight style={{color:'gray'}} onClick={paginationRight(clothesIndexFirst,clothesIndexLast)} className={css.icon} />
          ):(
            <FaArrowRight onClick={paginationRight(clothesIndexFirst,clothesIndexLast)} className={css.icon} />
          )}
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Electronics</h1>

        <div className={css.maindiv}>
          {Electronics.slice(
            electronicsIndexFirst,
            electronicsIndexLast
          ).map((product) => {
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
        {electronicsIndexFirst === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={paginationLeft(electronicsIndexFirst,electronicsIndexLast)} className={css.icon} />
          )}
          <FaArrowRight onClick={paginationRight(electronicsIndexFirst,electronicsIndexLast)} className={css.icon} />
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Jewellery</h1>

        <div className={css.maindiv}>
          {Jewlery.slice(
            jewleryIndexFirst,
            jewleryIndexLast
          ).map((product) => {
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
        {jewleryIndexFirst === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={paginationLeft(jewleryIndexFirst,jewleryIndexLast)} className={css.icon} />
          )}
          <FaArrowRight onClick={paginationRight(jewleryIndexFirst,jewleryIndexLast)} className={css.icon} />
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
              <Link href="#">Best Sellers</Link>
            </li>
            <li className={css.li}>
              <Link href="#">Gift Ideas</Link>
            </li>
            <li className={css.li}>
              <Link href="#">New Releases</Link>
            </li>
            <li className={css.li}>
              <Link href="#">Today's Deals</Link>
            </li>
            <li className={css.li}>
              <Link href="#">Customer Service</Link>
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
