import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

//this is publishaple key of Stripe
//you can get all info in stripe docs react Stripe.js file
const promise = loadStripe(
  "pk_test_51HSLXRImtAQnmphTf2tFJLZDQZPyWVw8aM1Dd0pMBGA27JWVxj3MhgdWyDQ1mWKxdNwy466PrxFqsK5j2QDlAlWd00LjXq32ew"
);
function App() {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    //this will only run once when app component runs
    //and after every update
    //[]you can put after whuch upadates it will run

    //we want to store the user authenticatiin on datalayer

    auth.onAuthStateChanged((authUser) => {
      console.log("The user is", authUser);

      if (authUser) {
        //the user is just logged in /the user was logged in
        //this push user into datalayer when user logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user logged out
        //when user logged out set user to null
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        {/*Header Should be always on every time when you take a different route*/}

        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/product_list">
            {/*Checkout component*/}
            <Header />
            <Checkout />
          </Route>
          {/*when ever we click on the proceed to payment button */}
          <Route path="/payment">
            <Header />
            {/*payment component should be inside of stripe elements */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          {/*Always home route should be at bottom This is home route "/"" */}
          <Route path="/">
            <Header />
            {/*Home Component*/}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
