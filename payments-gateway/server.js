require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    console.log("Items array from client:", cartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "LK"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "usd" },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 1 },
            },
          },
        },
      ],
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // assuming total is in dollars and converted to cents
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.SUCCESS_URL}`,
      cancel_url: `${process.env.REDIRECT_URL}`,
      automatic_tax: {
        enabled: true,
      },
    });

    if (session) {
      // Redirect to the URL obtained from session.url
      res.json({ url: session.url });
    } else {
      // If session.url is not present in the response, return an error
      console.log("Stripe API response:", session);
      res.status(500).json({ error: "Failed to create session" });
    }
    console.log(session.url);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Payment Failed" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));