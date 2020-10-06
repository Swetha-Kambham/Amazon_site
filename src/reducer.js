export const initialState = {
  basket: [],
  user: null,
};

//tally the final amount of basket items prices
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

//context api and redux are not same but uses the same store for global for app

//when ever we click on add to cart we have to store it in data layer through reducer
const reducer = (state, action) => {
  //when ever we click add to basket in product.js them it will printed in console
  //console.log(action);
  switch (action.type) {
    case "ADD_TO__BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      // ...state,
      //basket: state.basket.filter((item) => item.id !== action.id),
      //the above statements will delete all the items with the same id,then
      //i we have multiple items then all are deleted.
      //for that we are going to find the index of that item

      //with that state.basket we findindex of which basket item equal to
      //item(action) which we clicked to remove
      //if both id's are equal then we find index of that
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      //copy the basket
      let newBasket = [...state.basket];
      //if the index>0
      //index of basket
      if (index >= 0) {
        //delete the item in that indes in the newbasket
        //basket array[product1,product2,product2];array[0,1,2] index
        //splice means cut out the element at index.
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove item (id:${action.id}) as it not in basket`);
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
export default reducer;
