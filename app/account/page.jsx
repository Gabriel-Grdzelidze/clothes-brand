"use client";
import { useState } from 'react';
import '.././globals.css'
import css from "./account.module.css";

const Account = () => {

    const[ name , setName ] = useState("")
    const[ email , setEmail ] = useState("")
    const[ password ,setPassword ] = useState("")

    function submitHandler(){
        fetch("/api/products", {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ 
                name: name,
                email: email,
                password: password
            })
        })
        .then(response => response.json())  
        .then(data => {
            console.log('Success:', data); 
        })
       
    }

  return (
    <div className={css.body}>
      <div className={css.box}>
        <div className={css.left}></div>
        <div className={css.right}>
          <form onSubmit={submitHandler}>
            <div>
              <h1 className={css.title}>Sign Up</h1>
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="text">
                Your Name
              </label>
              <input onChange={(e)=> {setName(e.target.value)}} className={css.input} id="name" placeholder="Type Here" type="text" />
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="text">
                Your Email
              </label>
              <input onChange={(e) => {setEmail(e.target.value)}} className={css.input} id="name" placeholder="Type Here" type="text" />
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="text">
                Your Password
              </label>
              <input onChange={(e) =>{ setPassword(e.target.value)}} className={css.input} id="name" placeholder="Type Here" type="text" />
            </div>

            <button type='submit' className={css.button}>Become a Member</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
