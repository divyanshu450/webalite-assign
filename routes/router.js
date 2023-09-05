const express = require('express');
const router = express.Router();
const {getCollection, updateCollection, deleteCollection, postCollection} = require("../controller/controller")

router.get("/items", getCollection);
router.post("/items", postCollection);
router.put("/items/:name", updateCollection);
router.delete("/items/:name", deleteCollection);

module.exports = router;