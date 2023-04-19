const express = require("express");
const router = express.Router();
const {KeyWords} = require("../models");

router.get("/", async (req, res) => {
    const listOfKeyWords = await KeyWords.findAll()
    res.json(listOfKeyWords)
})

router.post("/", async (req, res) => {
    try {
      const newKeyWord = await KeyWords.create(req.body);
      res.json(newKeyWord);
    } catch (error){
      res.status(400).send(error);
      }
  })

module.exports = router;