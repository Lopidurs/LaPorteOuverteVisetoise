const express = require("express");
const router = express.Router();
const { Games, Types, KeyWords, Awards } = require("../models");

router.get("/", async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post("/", async (req, res) => {    
    try {
        data = req.body
        const newGame = await Games.create({
            Name: data.Name,
            Brand: data.Brand,
            Age: data.Age,
            MinPlayer: data.MinPlayer,
            MaxPlayer: data.MaxPlayer,
            Release: data.Release ? data.Release : null,
            Description: data.Description,
        })

        for(award of data.Awards) {
            newGame.setAwards(award.id)
        }
        for(type of data.Types) {
            newGame.setTypes(type.id)
        }
        for(keyword of data.KeyWords) {
            newGame.setKeyWords(keyword.id)
        }
        res.json(newGame);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

module.exports = router;