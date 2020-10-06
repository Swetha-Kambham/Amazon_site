import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";

import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="advertisement"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Fashion/WA19/ILM/640x45._CB445198997_.jpg"
          alt="ad"
        />
        <div>
          {/*display user email*/}
          <h1>Hello, {user?.email}</h1>
          <h1 className="shopping_list">Your Shopping Basket</h1>
          {/*for every item in basket claa checkout with prorps */}
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
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
