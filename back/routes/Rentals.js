const express = require("express");
const router = express.Router();
const { Rentals, Users, Games } = require("../models");

router.post("/", async (req, res) => {
    try {
        data = req.body
        listNewRentals = []
        for (game of data.games) {
            const newRental = await Rentals.create({
                BeginRental: game.BeginRental,
                EndRental: game.EndRental,
                GameId: game.id,
                UserId: data.user
            })
            listNewRentals.push(newRental)
        }
        res.json(listNewRentals)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get("/user", async (req, res) => {
    try {
        console.log(req.query.id)
        const listOfRentals = await Rentals.findAll({
            where: { UserId: req.query.id },
            include: [Games]
        })
        res.json(listOfRentals)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router