const express = require("express");
const router = express.Router();
const { Games, Types, KeyWords, Awards } = require("../models");

router.get("/", async (req, res) => {
    const listOfGames = await Games.findAll({
        include: [
            {
                model: Types,
                as: "Types",
                attributes: ["Name"],
                through: {
                    attributes: []
                }
            },
            {
                model: KeyWords,
                as: "KeyWords",
                attributes: ["Name"],
                through: {
                    attributes: []
                }
            },
            {
                model: Awards,
                as: "Awards",
                attributes: ["Name"],
                through: {
                    attributes: []
                }
            },
        ]
    })
    res.json(listOfGames)
})

router.post("/", async (req, res) => {
    try {
        const newGame = await Games.create(req.body);
        console.log(newGame);
        res.json(newGame);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;