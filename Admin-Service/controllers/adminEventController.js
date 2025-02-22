const Product = require("../models/adminProductModel");

const eventhandler = async (req, res) => {
  const event = req.body;
  const { type, data } = event;
  if (type === "ProductAdded") {
    console.log("createEvent event received");
    //console.log(data);
    const { newProduct } = data;
    const {
      name,
      description,
      price,
      quantity,
      category,
      seller,
      imageUrl,
      _id,
    } = newProduct;

    console.log("id-----", _id);
    // console.log("name: " + name);
    // console.log("description: " + description);
    // console.log("price: " + price);
    // console.log("quantity: " + quantity);
    // console.log("category: " + category);
    // console.log("sellerId: " + seller);
    // console.log("imageUrl: " + imageUrl);

    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        quantity,
        category,
        imageUrl,
        seller,
        pId: _id,
      });
      console.log(newProduct);

      res.send({ status: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    console.log("unNeeded received");
    res.send({ status: "OK" });
  }
};

module.exports = {
  eventhandler,
};
