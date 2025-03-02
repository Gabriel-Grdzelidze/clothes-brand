'use client'
import css from "./Hero.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { FaPortrait } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";



function Hero() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <section className={css.section}>
      {isMenuOpen && <div
        className={`fixed top-0 left-0 h-full bg-gray-950 text-white transition-all duration-300 ${
          isMenuOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl text-white hover:text-orange-500 transition-all"
          aria-label="Close Menu"
        >
          &times;
        </button>
        <nav className="flex flex-col items-start p-6 space-y-4">
          <a href="#" className="text-lg hover:text-orange-500 transition-all">
            Home
          </a>
          <a href="#" className="text-lg hover:text-orange-500 transition-all">
            Fashion
          </a>
          <a href="#" className="text-lg hover:text-orange-500 transition-all">
            Electronics
          </a>
          <a href="#" className="text-lg hover:text-orange-500 transition-all">
            Jewellery
          </a>
        </nav>
      </div>}
      <div className={css.navdiv}>
        <ul className={css.ul}>
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
          <li className={css.li}><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </div>

      <div>
        <div className={css.h1}>
          <h1>Eflier</h1>
        </div>

        <div className={css.bigdiv}>
          <MdOutlineFormatLineSpacing className={css.icon} onClick={toggleMenu} />
          <select className={css.select1}>
            <option className={css.opt1} value="All Category">
              All Category
            </option>
            <option className={css.opt1} value="Action">
              Action
            </option>
            <option className={css.opt1} value="Another Action">
              Another Action
            </option>
            <option className={css.opt1} value="Something Else">
              Something Else
            </option>
          </select>
          <div>
            <input
              className={css.inp}
              type="text"
              name=""
              placeholder="Search This Blog"
            />
            <button className={css.searchbutt}>
              <CiSearch />
            </button>
          </div>
          <select className={css.select2}>
            <option value="English">English</option>
            <option value="Georgian">Georgian</option>
          </select>
          <div className={css.divp}>
            <Link className={css.p} href="cart">
              <FaCartArrowDown />
              Cart
            </Link>
            <a className={css.p} href="account">
              <FaPortrait />
              Account
            </a>
          </div>
        </div>
      </div>

      <div className={css.middiv}>
        <h1 className={css.h1mid}>
          Let's Start
          <br />
          Your Favorite Shopping
        </h1>
        <button className={css.buttmid}>Shop Now</button>
      </div>
      <a className={css.all} href="all-products">See All Products</a>
    </section>
  );
}

export default Hero;
