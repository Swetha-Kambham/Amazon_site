import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";

function Login() {
  //history  allows us programatically change the url

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //fancy firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    //do some fancy firebase register
    //this will create user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //it successfully create user with email and password
        console.log(auth);
        //we go to home page when user created.
        //if auth!=null means if user is there
        if (auth) {
          //got to home page
          //this is the usehistory use
          history.push("/");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo-700x394.png"
          alt="amazon__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in </h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            //here we are changing the mail e.target.value is what user enter.
            //it set the email
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>PassWord</h5>
          <input
            type="password"
            value={password}
            //e.target.value is what user enter.
            //it set the password
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>

        <button
          onClick={register}
          className="login__registerButton"
          value={password}
          onChange=""
        >
          Create Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
