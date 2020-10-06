import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/September/GWBanners/Control/DesktopHero_1500x600._CB405007888_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id={1}
            title="The little Things"
            rating={3}
            price={19.9}
            image="https://m.media-amazon.com/images/I/41kG9WPH9aL._AC_UY218_.jpg"
          />
          <Product
            id={2}
            title="Armitron Sport Women's 45/7012 Digital Chronograph Watch"
            rating={4}
            price={17}
            image="https://images-na.ssl-images-amazon.com/images/I/71pfswm0DlL._AC_UY679_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id={3}
            title="Elina fashion Saree for Women Cotton Art Silk Sarees for Indian Wedding Gift, Sari and Unstitched Blouse Piece
"
            rating={4}
            price={10}
            image="https://images-na.ssl-images-amazon.com/images/I/81XJ9cMZ3AL._AC_UY500_.jpg"
          />
          <Product
            id={4}
            title="Nature Valley Breakfast Biscuits, Breakfast Sandwich, Almond Butter Filling"
            rating={4}
            price={2}
            image="https://images-na.ssl-images-amazon.com/images/I/91FYCc3%2BByL._SL1500_.jpg"
          />
          <Product
            id={5}
            title="Instant Pot Duo 7-in-1 Electric Pressure Cooker, Sterilizer, Slow Cooker, Rice Cooker, Steamer, Saute, Yogurt Maker, and Warmer, 6 Quart, 14 One-Touch Programs"
            rating={4}
            price={79}
            image="https://images-na.ssl-images-amazon.com/images/I/81i8c1fSkyL._AC_SL1500_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id={6}
            title="Lucky Brand Men's Venice Burnout Notch Neck Tee Shirt"
            rating={5}
            price={19.68}
            image="https://images-na.ssl-images-amazon.com/images/I/81t7sOzECtL._AC_UX425_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
