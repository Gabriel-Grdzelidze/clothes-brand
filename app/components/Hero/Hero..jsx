import css from "./Hero.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { FaPortrait } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Menu from "../menu/menu";

function Hero() {
  return (
    <section className={css.section}>
      <Menu  />
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
        </ul>
      </div>

      <div>
        <div className={css.h1}>
          <h1>Eflier</h1>
        </div>

        <div className={css.bigdiv}>
          <MdOutlineFormatLineSpacing className={css.icon} />
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
            <a className={css.p} href="#">
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
    </section>
  );
}

export default Hero;
