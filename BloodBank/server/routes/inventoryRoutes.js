const router = require("express").Router();
const Inventory = require("../models/inventoryModal");
const User = require("../models/UserModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    //validate email and invetiry tyope
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Email");

    if (req.body.InventoryType === "in" && user.userType !== "donor") {
      throw new Error("The email is not recognize as a donor");
    }

    if (req.body.InventoryType === "out" && user.userType !== "hospital") {
      throw new Error("The email is not recognize as a hospital");
    }

    //create inventory
    if (req.body.InventoryType === "out") {
      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    //add inventory
    const inventory = new Inventory(req.body);
    await inventory.save();

    return res.send({
      success: true,
      message: "Inventory Added Successfully!",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
