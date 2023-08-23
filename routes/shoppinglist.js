const express = require("express");
const router = express.Router();

const Shoppinglist = require("../models/shoppinglist");

router.get("/", async (req, res) => {
  const { name, quantity, unit, priority, purchased } = req.query;
  let filter = {};

  if (name || quantity || unit || priority || purchased) {
    if (name) {
      filter.name = name;
    }
    if (quantity) {
      filter.quantity = { $gt: quantity };
    }
    if (unit) {
      filter.unit = unit;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (purchased) {
      filter.purchased = purchased;
    }
  }

  res.send(await Shoppinglist.find(filter));
});

/* get specific shoppinglist by id */
router.get("/:id", async (req, res) => {
  const data = await Shoppinglist.findOne({ _id: req.params.id });
  res.send(data);
});

/*create new shoppinglist route */
router.post("/", async (req, res) => {
  const newShoppinglist = new Shoppinglist({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    priority: req.body.priority,
    purchased: req.body.purchased,
  });
  // save the shoppinglist in MongoDb
  await newShoppinglist.save();
  res.send(newShoppinglist);
});

/* update a shoppinglist */
router.put("/:id", async (req, res) => {
  const shoppinglist_id = req.params.id;
  const updateShoppinglist = await Shoppinglist.findByIdAndUpdate(
    shoppinglist_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.send(updateShoppinglist);
});

router.put("/:id/purchased", async (req, res) => {
  const shoppinglist_id = req.params.id;
  const purchasedItem = await Item.findByIdAndUpdate(
    shoppinglist_id,
    {
      purchased: true,
    },
    {
      new: true,
    }
  );
  res.send(purchasedItem);
});

/*delete a movie */
router.delete("/:id", async (req, res) => {
  const shoppinglist_id = req.params.id;
  const deletedShoppinglist = await Shoppinglist.findByIdAndDelete(
    shoppinglist_id
  );
  res.send(deletedShoppinglist);
});

module.exports = router;
