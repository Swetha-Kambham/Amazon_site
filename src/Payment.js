import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
//hooks for using payment
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  //error when
  //these are use for when we type in card
  //error handle error and disable the to click
  //intially error=null
  //disabled:true.

  //if any error occur in payment
  const [error, setError] = useState(null);
  //if an empty event
  const [disabled, setDisabled] = useState(true);
  //payment processing
  const [processing, setProcessing] = useState("");
  //for button,payment succeded/not
  const [succeeded, setSucceeded] = useState(false);
  //we want to use a state value which is ClientScreat
  //which is used to
  const [clientSecret, setClientSecret] = useState(true);

  //useEffect is run when a payment component loads and when the basket updates
  //means the items in the basket changes.cost is also changes

  useEffect(() => {
    //generate the special stripe secret
    //which allows us to change a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in currency submits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The Secret is", clientSecret);

  const handleSubmit = async (event) => {
    //stripe stuff
    //this will stop refreshiing
    event.preventDefault();
    //to disble the  button when once user click submit.
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent=payment confirmation
        //when after complete payment
        //go to the firestore and store the orders
        //first users->payment(order) id->basket,amount and
        db.collection("users")
          //user id doc
          .doc(user?.uid)
          .collection("orders")
          //id of orders
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        //after payment we go to oders page
        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    //listen changes in card lements
    //and display any eeors as the customer type
    //their card details

    //if the event is empty setDisables
    setDisabled(event.empty);
    //if there an error show error
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {/*when you click on items then it will take you to chechout component/page */}
          Checkout(
          <Link to="Product_list">{basket?.length} items</Link>)
        </h1>
        {/*payment Section-delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h1>Delivery Address</h1>
          </div>
          <div className="payment__address">
            <p>Email:{user?.email}</p>
            <p>Moillacheruvu</p>
            <p>Veerapunayuni Palli</p>
            <p>Kadapa(Dist)</p>
            <p>Andhra Pradesh ,516321</p>
          </div>
        </div>

        {/*payment Section-Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h2>Review Items and Delivery</h2>
          </div>
          <div className="payment__items">
            {/*products in basket*/}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/*payment Section-Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h2>Payment Method</h2>
          </div>
          <div className="payment__details">
            {/*stripe the payment */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return <h3>Order Value: {value}</h3>;
                  }}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/*make button diable when the payment is processing /event is empty disabled/payment successful */}
                <button disabled={processing || disabled || succeeded}>
                  {/*if payment processing show processing else show "buy now" */}
                  <spam>{processing ? <p>Processing</p> : "Buy Now"}</spam>
                </button>
              </div>

              {/*errors ,if error occur show error*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
