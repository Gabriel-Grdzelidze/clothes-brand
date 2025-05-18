"use client";
import Image from "next/image";
import css from "./productList.module.css";
import React, { useEffect, useState } from "react";
import Feedback from "./feedback";
import FeedbackError from "./feedbackerror";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CARD } from "../../../graphql/query";
import Link from "next/link";

function ProductList() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showError, setShowError] = useState(false);
  const { data, loading, error } = useQuery(GET_PRODUCT_CARD);
  const products = data?.products ?? [];

  const [clothesIndex, setClothesIndex] = useState({ first: 0, last: 3 });
  const [electronicIndex, setElectronicIndex] = useState({ first: 0, last: 3 });
  const [jewelryIndex, setJewelryIndex] = useState({ first: 0, last: 3 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(false);
      setShowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showFeedback, showError]);

  function submited() {
    setShowFeedback(true);
  }

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

  const Card = React.memo(({ id, title, price, img }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Link href={`product/${id}`}>
          <div className={css.card}>
            <h1 className={css.cardTitle}>{title}</h1>
            <p>
              <span className={css.span1}>Price</span>
              <span className={css.span2}>{price}$</span>
            </p>
            <Image
              className={css.img}
              src={img}
              alt={title}
              width={200}
              height={150}
              onLoad={() => setLoaded(true)}
            />
            <div className={css.otherdiv}>
              <p className={css.a1}>Buy Now</p>
              <p className={css.a2}>See More</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  if (loading) return <p className="ml-[900px] text-4xl">Loading...</p>;
  if (error) return <p>this bullshit doesnt work</p>;

  const Clothes = products.filter((product) => product.category === "clothes");
  const Electronics = products.filter((product) => product.category === "electronic");
  const Jewelry = products.filter((product) => product.category === "jewlery");

  return (
    <div className={css.thediv}>
      <section className={css.section}>
        <h1 className={css.h1}>Man & Woman Fashion</h1>
        <div className={css.maindiv}>
          {Clothes.slice(clothesIndex.first, clothesIndex.last).map((product) => (
            <Card
              key={product.id}
              title={product.title}
              img={product.mainImg}
              id={product.id}
              price={product.price}
            />
          ))}
        </div>
        <div className={css.icons}>
          {clothesIndex.first === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={() => paginationLeft(setClothesIndex, clothesIndex)} className={css.icon} />
          )}
          {clothesIndex.last >= Clothes.length ? (
            <FaArrowRight className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowRight onClick={() => paginationRight(setClothesIndex, clothesIndex, Clothes.length)} className={css.icon} />
          )}
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Electronics</h1>
        <div className={css.maindiv}>
          {Electronics.slice(electronicIndex.first, electronicIndex.last).map((product) => (
            <Card
              key={product.id}
              title={product.title}
              img={product.mainImg}
              id={product.id}
              price={product.price}
            />
          ))}
        </div>
        <div className={css.icons}>
          {electronicIndex.first === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={() => paginationLeft(setElectronicIndex, electronicIndex)} className={css.icon} />
          )}
          {electronicIndex.last >= Electronics.length ? (
            <FaArrowRight className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowRight onClick={() => paginationRight(setElectronicIndex, electronicIndex, Electronics.length)} className={css.icon} />
          )}
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Jewellery</h1>
        <div className={css.maindiv}>
          {Jewelry.slice(jewelryIndex.first, jewelryIndex.last).map((product) => (
            <Card
              key={product.id}
              title={product.title}
              img={product.mainImg}
              id={product.id}
              price={product.price}
            />
          ))}
        </div>
        <div className={css.icons}>
          {jewelryIndex.first === 0 ? (
            <FaArrowLeft className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowLeft onClick={() => paginationLeft(setJewelryIndex, jewelryIndex)} className={css.icon} />
          )}
          {jewelryIndex.last >= Jewelry.length ? (
            <FaArrowRight className={css.icon} style={{ color: "gray" }} />
          ) : (
            <FaArrowRight onClick={() => paginationRight(setJewelryIndex, jewelryIndex, Jewelry.length)} className={css.icon} />
          )}
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
            <li className={css.li}><Link href="#">Best Sellers</Link></li>
            <li className={css.li}><Link href="#">Gift Ideas</Link></li>
            <li className={css.li}><Link href="#">New Releases</Link></li>
            <li className={css.li}><Link href="#">Today's Deals</Link></li>
            <li className={css.li}><Link href="#">Customer Service</Link></li>
          </ul>
        </div>
        <div>
          <p>Help Line Number : +1 1800 1200 1200</p>
        </div>
        <div>
          <p>© 2020 All Rights Reserved. Design by Free html Templates</p>
        </div>
        {showFeedback && <Feedback />}
        {showError && <FeedbackError />}
      </section>
    </div>
  );
}

export default ProductList;
 