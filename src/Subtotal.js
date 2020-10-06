import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
//here we want to display the taotal amount for that we are importing the StateProvider.js
//because which is maintainng in the data layer.having product list
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "./reducer";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  //this is we are adding the price of total items
  /*   let sum = 0;
  for (let i = 0; i < basket.length; i++) {
    sum = sum + (basket.length !== 0 ? basket[i].price : 0);
  }*/
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <>
              <p>
                Subtotal ({basket.length} items):
                <strong>{value}</strong>
              </p>
              <small className="subtital__gift">
                <input type="checkbox" />
                This order contains gift
              </small>
            </>
          );
        }}
        decimalScale={2}
        //this means if the basket is empty then value:0 otherwise we have to give the
        // recently added product valuebasket[index].price;
        value={getBasketTotal(basket)} //home work//get the total price from reducer
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        className="process__button"
        onClick={(e) => history.push("/payment")}
      >
        proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
