const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.post("/", async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;