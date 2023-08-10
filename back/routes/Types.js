const express = require("express");
const router = express.Router();
const { Types } = require("../models");
const authMiddleware = require('../middleware/authMiddleware')

router.get("/", authMiddleware, async (req, res) => {
  const listOfTypes = await Types.findAll()
  res.json(listOfTypes)
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newType = await Types.create(req.body);
    res.json(newType);
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;