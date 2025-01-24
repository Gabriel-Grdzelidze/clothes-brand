"use client";
import Image from "next/image";
import css from "./productList.module.css";
import React, { Children, use, useEffect, useState } from "react";
import Feedback from "./feedback";
import FeedbackError from "./feedbackerror";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";



function ProductList(props) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showerror, setShowError] = useState(false);
  const [isLoading ,setIsLoading] = useState(true)
  const [Clothes, setClothes] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [jewlery, setJewlery] = useState([]);
  
  useEffect(() => {
    async function clothesProducts() {
      const result = await fetch("/api/verifiuser");
      const data = await result.json();
      setClothes(data);
     setIsLoading(false);
    }

    async function electronicProducts() {
      const result = await fetch("/api/addproduct");
      const data = await result.json();
      setElectronics(data);
     setIsLoading(false);
    }

    async function jewleryProducts() {
      const result = await fetch("/api/jewleryProducts");
      const data = await result.json();
      setJewlery(data);
     setIsLoading(false);
    }

    electronicProducts();
    clothesProducts();
    jewleryProducts();
  }, []);


 

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

  

  // const electronics_products = [
  //   {
  //     id: "laptop",
  //     title: "Lap-top",
  //     price: "500$",
  //     img: "/laptop.png",
  //   },
  //   {
  //     id: "mobile",
  //     title: "Mobile",
  //     price: "300",
  //     img: "/mobile.png",
  //   },
  //   {
  //     id: "pc",
  //     title: "PC",
  //     price: "800$",
  //     img: "/computer.png",
  //   },
  // ];

  // const Jewllery_products = [
  //   {
  //     id: "jumkas",
  //     title: "Jumkas",
  //     price: "300$",
  //     img: "/1.png",
  //   },
  //   {
  //     id: "neckles",
  //     title: "Neckles",
  //     price: "500$",
  //     img: "/2.png",
  //   },
  //   {
  //     id: "kangans",
  //     title: "Kangans",
  //     price: "800$",
  //     img: "/3.png",
  //   },
  // ];
  

 

 


  const Card = React.memo( (props) => {
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500); 
    return () => clearTimeout(timer);
  }, []);


  console.log(electronics)

  

    return (
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
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
  })


if(isLoading){return <p>Loaing...</p>}
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
          {electronics.map((product) => {
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
        {jewlery.map((product) => {
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
