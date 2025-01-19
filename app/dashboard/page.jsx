"use client";
import "../globals.css";
import Image from "next/image";
import css from "./dashboard.module.css";
import { useState } from "react";
import { BsHouseDoor } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";
import Customers from "./customers";
import Inventory from "./Inventory";
import Dash from "./dash";

function Dashboard() {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const [dashboard , setDashboard] = useState(true)
  const [inventory , setInventory] = useState(false)
  const [customers , setCustomers] = useState(false)

  function dashboardhandler(){
    setDashboard(true)
    setInventory(false)
    setCustomers(false)
  }

  function inventoryhandler(){
    setDashboard(false)
    setInventory(true)
    setCustomers(false)
  }

  function customershandler(){
    setDashboard(false)
    setInventory(false)
    setCustomers(true)
  }

  async function submitHandler(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/verifi-user", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Something went wrong.");
        return;
      }
  
      const data = await response.json();
      setSuccessMessage(data.message || "Login successful!");
      setLogin(false);
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      setLogin(false)
    }
  }
  

  if (login) {
    return (
      <div className={css.signdiv}>
        <form onSubmit={submitHandler}>
          <div className={css.signbox}>
            <h1 className={css.signh1}>Confirm Your Identity</h1>

            <div className={css.signdivbox}>
              <label>Name</label>
              <input
                className={css.signinp}
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={css.signdivbox}>
              <label>Password</label>
              <input
                className={css.signinp}
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={css.signbutt} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Confirm"}
            </button>
          </div>
        </form>

        {errorMessage && <p className={css.error}>{errorMessage}</p>}
        {successMessage && <p className={css.success}>{successMessage}</p>}
      </div>
    );
  }

  return (
    <div className={css.pagebox}>
      <div className={css.sidebar}>
        <div className={css.h1div}>
          <h1 className={css.h1bold}>Clothes</h1>
          <h1 className={css.h1notbold}>Store</h1>
        </div>

        <div className={css.sidebuttons}>
          <p className={dashboard? css.sidebuttonactivated: undefined} onClick={dashboardhandler}>
            <span>
              <BsHouseDoor />
            </span>{" "}
            <span>Dashboard</span>
          </p>
          <p className={inventory? css.sidebuttonactivated: undefined} onClick={inventoryhandler}>
            <span>
              <BsBoxSeam />
            </span>{" "}
            <span>Inventory</span>
          </p>
          <p className={customers? css.sidebuttonactivated: undefined} onClick={customershandler}>
            <span>
              <RxPerson />
            </span>{" "}
            <span>Customers</span>
          </p>
        </div>
      </div>

      <div className={css.rightbox}>
        <div className={css.topdiv}>
          <div className={css.searchdiv}>
            <span>
              <SlMagnifier />
            </span>
            <input type="text" placeholder="Search..." id="" />
          </div>

          <div className={css.profbox}>
            <div>
              <BiSolidMessageRounded />
              <FaBell className={css.bellicon} />
            </div>
            <div>
              <p>
                <span>Hello, </span> <span>Grdzelo</span>
              </p>{" "}
              <a href="/profile.png"><Image className={css.profImg} width={50} height={50} src="/profile.png" alt="profile" /></a>
            </div>
          </div>
        </div>

        <div className={css.bottomdiv}>
          {dashboard && <Dash />}
          {inventory && <Inventory />}
          {customers && <Customers />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
