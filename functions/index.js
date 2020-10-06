const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
//const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51HSLXRImtAQnmphT6gz4uPggKTvUb8TdRin7S4YEIWu5DJ3uVNh59Zj58zWEItVnAl9l00GTciOLA12wi4SoudYv00VOTa7zIk"
);

//API

//-App config
const app = express();

//-Middlewares

app.use(cors({ origin: true }));
app.use(express.json());

//-API Routes

app.get("/", (request, response) => response.status(200).send("web world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment ReQuest Received amount", total);

  const paymentIntent = await stripe.paymentIntents.create({
    description: "web world",
    payment_method_types: ["card"],
    amount: total, //subunits of currency
    currency: "inr",
    // payment_method_types: ["card"],
  });
  console.log("payment Received", total);
  //ok-created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//-Listen Command
//setup for cloud functions

exports.api = functions.https.onRequest(app);

//example end-point
//http://localhost:5002/clone-83733/us-central1/api
