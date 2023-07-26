const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.get("/details", async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.query.id } })
        res.json(user)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/", async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.body.id } })
        if (user) {
            await user.update(req.body)
            res.json(user)
        } else {
            res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;