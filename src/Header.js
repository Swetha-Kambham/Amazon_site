import React from "react";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    //if user exists then sign out
    if (user) {
      //signOut is the firebase function for signOut the user
      auth.signOut();
    }
  };

  return (
    <div className="header">
      {/*when we click on amazon logo we have to goto home directory. */}
      <Link to="/">
        <img
          className="header__logo"
          src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"
          alt="amazon-logo"
        />
      </Link>
      {/*heDER sERACH*/}
      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header__nav">
        {/*when ever we click on signin we go to login page */}
        {/*if no user =>go to login page,otherwise not */}
        <Link to={!user && "/login"}>
          {/*when user clicks on sign in/signout then we have to handle that event */}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              {/*if user is logged in then user name other wise guest*/}
              Hello {user ? user.email : "Guest"}
            </span>
            {/*if the user exists then show sign out otherwise sign in */}
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        {/*when we click on backet icon then we move to checkout page which have products list */}
        <Link to="/product_list">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span
              className="header__optionLineTwo  
            header__basketCount"
            >
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
