import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

mercadopago.configure({
  access_token: MERCADOPAGO_API_KEY,
});
console.log("mercadopago")
export const createOrder = (req, res) => {
  const items = [
    {
      title: "Laptop",
      unit_price: 500,
      currency_id: "PEN",
      quantity: 1,
    },
  ];

  const preferences = {
    items,
    notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
    back_urls: {
      success: "http://localhost:5500/success",
      // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
      // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
    },
  };

  mercadopago.preferences
    .create(preferences)
    .then((result) => {
      console.log(result);
      res.json(result.body);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to create payment preference" });
    });
};

export const receiveWebhook = (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);

    if (payment.type === "payment") {
      mercadopago.payment.findById(payment["data.id"]).then((data) => {
        console.log(data);
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process webhook" });
  }
};
