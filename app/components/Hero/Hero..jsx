"use client";
import css from "./Hero.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { FaPortrait } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import theme from "../../../theme/index";

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <section className={css.section}>
      {session && (
        <div
          style={{ backgroundColor: theme.bgBlack(0.5) }}
          className="absolute top-[50px] right-[100px] flex justify-center items-center gap-4 p-3 rounded-lg"
        >
          <p className="text-white">{session.user.name}</p>
          <Image
            className="rounded-[50%]"
            src={session.user.image}
            alt="profile"
            width={35}
            height={35}
          />{" "}
        </div>
      )}
      {isMenuOpen && (
        <div
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
            <Link
              href="#"
              className="text-lg hover:text-orange-500 transition-all"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-orange-500 transition-all"
            >
              Fashion
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-orange-500 transition-all"
            >
              Electronics
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-orange-500 transition-all"
            >
              Jewellery
            </Link>
          </nav>
        </div>
      )}
      <div className={css.navdiv}>
        <ul className={css.ul}>
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
          {session ? (
            <li className={css.li}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          ) : null}
        </ul>
      </div>

      <div>
        <div className={css.h1}>
          <h1>Eflier</h1>
        </div>

        <div className={css.bigdiv}>
          <MdOutlineFormatLineSpacing
            className={css.icon}
            onClick={toggleMenu}
          />
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
            {session ? (
              <button
                style={{ display: "flex", alignItems: "center", color: "#fff" }}
                onClick={() => signOut()}
              >
                Sign Out{" "}
                <span>
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </span>
              </button>
            ) : (
              <Link className={css.p} href="account">
                <FaPortrait />
                Account
              </Link>
            )}
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
      <Link className={css.all} href="all-products">
        See All Products
      </Link>
    </section>
  );
}

export default Hero;
