import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    //remove item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="chekoutProduct">
      <img className="ChechoutProduct_image" src={image} alt="/" />
      <div className="checkoutProduct__info">
        <p className="CheckoutProduct__title">{title}</p>
        <p className="CheckputProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="CheckoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
