const router = require("express").Router();
const { User } = require("../models/user.model");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Exclude sensitive information like the password from the response
    
    res.status(200).send({ user});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
