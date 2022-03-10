const express = require("express");
const { createList, deleteList, getList } = require("../controllers/lists");
const router = express.Router();

router.post("/", createList);
router.route("/:id").delete(deleteList);
router.get("/", getList);

module.exports = router;
