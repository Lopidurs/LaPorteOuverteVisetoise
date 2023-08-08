const express = require("express");
const router = express.Router();
const { Rentals, Users, Games } = require("../models");
const { Op } = require('sequelize');

router.post("/", authMiddleware, async (req, res) => {
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

router.get("/user", authMiddleware, async (req, res) => {
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

router.get("/game", authMiddleware, async (req, res) => {
    try {
        const listOfRentals = await Rentals.findAll({
            where: {
                GameId: req.query.id,
                Return: {
                    [Op.is]: null
                }
            }
        })
        res.json(listOfRentals)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})


router.put("/", authMiddleware, async (req, res) => {
    console.log(req.body)
    try {
        const rental = await Rentals.findOne({ where: { id: req.body.id } })
        if (rental) {
            await rental.update(req.body)
            res.json(rental)
        } else {
            res.status(404).send('Rental not found')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
module.exports = router