"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADD_USER } from "../../graphql/mutations";
import "../globals.css";
import css from "./account.module.css";
import { useMutation } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Account = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const [addUser] = useMutation(ADD_USER);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await addUser({
        variables: {
          name: name,
          email: email,
          password: password,
        },
      });
      setIsSubmitting(true);
      router.push("/");
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log("Error:", result.error);
      alert("Login failed: " + result.error);
    } else {
      console.log("Login success:", result);
      router.push("/");
    }
  };

  useEffect(() => {
   try{
    if (session) {
      router.push("/");
      
    }
   }catch(error){
    console.log(error)
   }
  }, [session, router]);
  if(isSubmitting){
    return <p>Signing In...</p>
  }
  if (login) {
    return (
      <div className={css.body}>
        <div className={css.box}>
          <div className={css.left}></div>
          <div className={css.right}>
            <form onSubmit={handleSignUp}>
              <h1 className={css.title}>Sign Up</h1>

              <div className={css.inputContainer}>
                <label className={css.label} htmlFor="name">
                  Your Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className={css.input}
                  id="name"
                  placeholder="Type Here"
                  type="text"
                />
              </div>

              <div className={css.inputContainer}>
                <label className={css.label} htmlFor="email">
                  Your Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className={css.input}
                  id="email"
                  placeholder="Type Here"
                  type="email"
                />
              </div>

              <div className={css.inputContainer}>
                <label className={css.label} htmlFor="password">
                  Your Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className={css.input}
                  id="password"
                  placeholder="Type Here"
                  type="password"
                />
              </div>

              <button
                className={css.state}
                onClick={(e) => {
                  setLogin(false);
                  e.preventDefault();
                }}
              >
                Login
              </button>

              <button
                type="submit"
                className={css.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Become a Member"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.body}>
      <div className={css.box}>
        <div className={css.right}>
          <form onSubmit={handleLogin}>
            <h1 className={css.title}>
              Login {session && <p>hello, {session.user.name}</p>}
            </h1>
            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="email">
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={css.input}
                id="email"
                placeholder="Type Here"
                type="text"
              />
            </div>

            <div className={css.inputContainer}>
              <label className={css.label} htmlFor="password">
                Your Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={css.input}
                id="password"
                placeholder="Type Here"
                type="password"
              />
            </div>

            <button
              className={css.state}
              onClick={(e) => {
                setLogin(true);
                e.preventDefault();
              }}
            >
              Signup
            </button>

            <div className="flex justify-center items-center gap-5 mt-8">
              <button
                className={css.signInButton}
                onClick={() => {
                  signIn("google");
                  setIsSubmitting(true);
                }}
              >
                Sign in with Google{" "}
                <span>
                  <Image
                    src={
                      "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    }
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
              <button
                className={css.signInButton}
                onClick={() => {
                  signIn("github");
                  setIsSubmitting(true);
                }}
              >
                Sign in with github{" "}
                <span>
                  <Image
                    src={
                      "https://img.icons8.com/?size=100&id=12599&format=png&color=000000"
                    }
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </div>

            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Confirm"}
            </button>
          </form>
        </div>
        <div className={css.left}></div>
      </div>
    </div>
  );
};

export default Account;
