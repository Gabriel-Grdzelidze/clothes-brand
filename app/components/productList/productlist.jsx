"use client";
import Image from "next/image";
import css from "./productList.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Feedback from "./feedback";
import FeedbackError from "./feedbackerror";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function ProductList() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showerror, setShowError] = useState(false);
  const inpRef = useRef();

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

  return (
    <div className={css.thediv}>
      <section className={css.section}>
        <h1 className={css.h1}>Man & Woman Fashion</h1>

        <div className={css.maindiv}>
          <div className={css.card}>
            <h1 className={css.cardTitle}>Man T-shirt</h1>
            <p>
              <span className={css.span1}>Price</span>{" "}
              <span className={css.span2}>30$</span>
            </p>
            <Image
              className={css.img}
              src={"/shirt.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.otherdiv}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>Man suit</h1>
            <p>
              <span className={css.span1}>Price</span>{" "}
              <span className={css.span2}>100$</span>
            </p>
            <Image
              className={css.img}
              src={"/suit.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.otherdiv}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>Woman dress</h1>
            <p>
              <span className={css.span1}>Price</span>{" "}
              <span className={css.span2}>70$</span>
            </p>
            <Image
              className={css.img}
              src={"/dress.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adiv}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>
        </div>
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Electronics</h1>

        <div className={css.maindiv}>
          <div className={css.card}>
            <h1 className={css.cardTitle}>laptop</h1>
            <p>
              <span className={css.span1}>start Price</span>{" "}
              <span className={css.span2}>300$$</span>
            </p>
            <Image
              className={css.img}
              src={"/laptop.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adivelectro}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>Mobile</h1>
            <p>
              <span className={css.span1}>Start Price</span>{" "}
              <span className={css.span2}>500$</span>
            </p>
            <Image
              className={css.img}
              src={"/mobile.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adivelectro}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>computers</h1>
            <p>
              <span className={css.span1}>Start Price</span>{" "}
              <span className={css.span2}>800$</span>
            </p>
            <Image
              className={css.img}
              src={"/computer.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adiv}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>
        </div>
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      <section className={css.section}>
        <h1 className={css.h1}>Jewellery</h1>

        <div className={css.maindiv}>
          <div className={css.card}>
            <h1 className={css.cardTitle}>Jumkas</h1>
            <p>
              <span className={css.span1}>start Price</span>{" "}
              <span className={css.span2}>300$$</span>
            </p>
            <Image
              className={css.img}
              src={"/1.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adivelectro}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>Necklaces</h1>
            <p>
              <span className={css.span1}>Start Price</span>{" "}
              <span className={css.span2}>500$</span>
            </p>
            <Image
              className={css.img}
              src={"/2.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adivelectro}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>

          <div className={css.card}>
            <h1 className={css.cardTitle}>Kangans</h1>
            <p>
              <span className={css.span1}>Start Price</span>{" "}
              <span className={css.span2}>800$</span>
            </p>
            <Image
              className={css.img}
              src={"/3.png"}
              alt="shirt"
              width={200}
              height={150}
            />
            <div className={css.adiv2}>
              <a className={css.a1} href="#">
                Buy Now
              </a>
              <a className={css.a2} href="#">
                See More
              </a>
            </div>
          </div>
        </div>
        <div className={css.icons}>
          <FaArrowLeft className={css.icon} />
          <FaArrowRight className={css.icon} />
        </div>
      </section>

      

      <section className={css.sectionBlack}>
        <h1 className={css.h1B}>Eflier</h1>

        <div className={css.inputdiv}>
          <input ref={inpRef} type="text" placeholder="Your Email" />
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
