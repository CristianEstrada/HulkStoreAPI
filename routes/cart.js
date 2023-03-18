const router = require("express").Router();
const Cart = require("../models/Cart");

const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("El Producto ha sido eliminado...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GETPRODUCT
router.get("/find/:userId", async (req, res) => {
  try {
    const Cart = await Cart.findOne({
        userId: req.params.userId
    });
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // GETALLPRODUCTS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
