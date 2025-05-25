"use client";
import css from "./Hero.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { FaPortrait } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import theme from "../../../theme/index";
import { useRouter } from "next/navigation";

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signoutMenu, setSignoutMenu] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <section className={css.section}>
    
      {signoutMenu && session ? (
        <div
          style={{ backgroundColor: theme.bgBlack(0.5) }}
          className={css.singoutMene}
        >
          <button onClick={()=>router.push('/dashboard')}>Dashboard</button>
          <button>Change Account</button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : null}

      {session && (
          <div
        style={{
          backgroundColor: theme.bgBlack(0.7),
          position: "absolute",
          top: 20,
          right: 20,
          width: 270,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: signoutMenu ? 0 : 10,
          borderBottomRightRadius: signoutMenu ? 0 : 10,
        }}
        className="absolute top-[50px] right-[100px] flex justify-between items-center gap-4 p-3 "
      >
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',gap:10}}>
          <p className="text-white">{session.user.name}</p>
         <Image
            className="rounded-[50%]"
            src={session.user.image}
            alt="profile"
            width={35}
            height={35}
          />{" "} 
      </div>
        {signoutMenu ? (
          <button onClick={() => setSignoutMenu(false)}>
            {" "}
            <ChevronUpIcon style={{ width: 30, height: 30 }} color="white" />
          </button>
        ) : (
          <button onClick={() => setSignoutMenu(true)}>
            <ChevronDownIcon style={{ width: 30, height: 30 }} color="white" />
          </button>
        )}
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
            {session ? null : (
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
