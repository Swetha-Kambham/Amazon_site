import React from "react";
import "./Product.css";
//we are importing the useStateValue from Stateprovider component
import { useStateValue } from "./StateProvider";

function Product({ id, title, rating, price, image }) {
  const [{ basket }, dispatch] = useStateValue();
  //console.log("This is basket", basket);
  const addToBasket = () => {
    //dispath the items into the data layer
    dispatch({
      type: "ADD_TO__BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="the little things" />
      <button className="product__btn" onClick={addToBasket}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
