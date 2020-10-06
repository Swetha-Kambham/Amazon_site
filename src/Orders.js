import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
function Orders() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();
  //after the order page loads

  useEffect(() => {
    if (user) {
      //we are accessing the items from firestore here
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        //in that orders,orderby descending order means most recently
        //selected item in top of list
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          //here we are setting orders.by iterating using map
          setOrders(
            snapshot.docs.map((doc) => ({
              //id of an item
              id: doc.id,
              //description of item like title etc.
              data: doc.data(),
            }))
          );
        });
    } else {
      //makes setOrders to empty.
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {/*we store orders in realtime database*/}
      {/*we push orders into firerbase databse */}
      <div className="orders_order">
        {orders?.map((order) => (
          //for every order  Order component with prop order
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
