const express = require("express");
const router = express.Router();
const { Awards } = require("../models");
const authMiddleware = require('../middleware/authMiddleware')

router.get("/", authMiddleware, async (req, res) => {
  const listOfAwards = await Awards.findAll()
  res.json(listOfAwards)
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newAward = await Awards.create(req.body);
    res.json(newAward);
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;