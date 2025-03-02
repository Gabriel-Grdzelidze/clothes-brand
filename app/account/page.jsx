"use client";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { ADD_USER } from "../../graphql/mutations";
import "../globals.css";
import css from "./account.module.css";
import { useMutation } from "@apollo/client";

const Account = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [addUser] = useMutation(ADD_USER)
  
  const  handleSignUp= async (e)=>{
    e.preventDefault()
    console.log(name,email,password)
    try {
      await addUser({
        variables:{
          name:name,
          email:email,
          password:password
        }
      }) 
      setIsSubmitting(true)
      router.push("/")
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

 
 

  // if (login) {
  //   return (
  //     <div className={css.body}>
  //       <div className={css.box}>
  //         <div className={css.right}>
  //           <form onSubmit={handleSignIn}>
  //             <h1 className={css.title}>Login</h1>

  //             <div className={css.inputContainer}>
  //               <label className={css.label} htmlFor="email">Your Name</label>
  //               <input
  //                 onChange={(e) => setName(e.target.value)}
  //                 className={css.input}
  //                 id="email"
  //                 placeholder="Type Here"
  //                 type="text"
  //               />
  //             </div>

  //             <div className={css.inputContainer}>
  //               <label className={css.label} htmlFor="password">Your Password</label>
  //               <input
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 className={css.input}
  //                 id="password"
  //                 placeholder="Type Here"
  //                 type="password"
  //               />
  //             </div>

  //           

  //             <button className={css.state} onClick={(e) => { setLogin(false); e.preventDefault(); }}>
  //               Signup
  //             </button>

  //             <button type="submit" className={css.button} disabled={isSubmitting}>
  //               {isSubmitting ? "Loading..." : "Confirm"}
  //             </button>
  //           </form>
  //         </div>
  //         <div className={css.left}></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={css.body}>
      <div className={css.box}>
        <div className={css.left}></div>
        <div className={css.right}>
          <form onSubmit={handleSignUp}>
            <h1 className={css.title}>Sign Up</h1>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="name">Your Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className={css.input}
                id="name"
                placeholder="Type Here"
                type="text"
              />
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="email">Your Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={css.input}
                id="email"
                placeholder="Type Here"
                type="email"
              />
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="password">Your Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={css.input}
                id="password"
                placeholder="Type Here"
                type="password"
              />
            </div>

          

            <button className={css.state} onClick={(e) => { setLogin(true); e.preventDefault(); }}>
              Login
            </button>

            <button type="submit" className={css.button} disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Become a Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
