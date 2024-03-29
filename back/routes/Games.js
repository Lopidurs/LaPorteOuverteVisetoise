const express = require("express");
const router = express.Router();
const { Games, Types, KeyWords, Awards } = require("../models");
const authMiddleware = require('../middleware/authMiddleware')

router.get("/", authMiddleware, async (req, res) => {
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

router.get("/details", authMiddleware, async (req, res) => {
    try {
        const game = await Games.findOne(
            {
                where: { id: req.query.id },
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
        res.json(game)
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post("/", authMiddleware, async (req, res) => {
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

        const awardsPromises = data.Awards.map(async award => {
            const [createdAward] = await Awards.findOrCreate({
                where: { Name: award.Name },
                defaults: { Name: award.Name }
            });
            await newGame.addAward(createdAward);
        });

        const typesPromises = data.Types.map(async type => {
            console.log(type)
            const [createdType] = await Types.findOrCreate({
                where: { Name: type.Name },
                defaults: { Name: type.Name }
            });
            await newGame.addType(createdType);
        });

        const keywordsPromises = data.KeyWords.map(async keyword => {
            const [createdKeyword] = await KeyWords.findOrCreate({
                where: { Name: keyword.Name },
                defaults: { Name: keyword.Name }
            });
            await newGame.addKeyWord(createdKeyword);
        });

        await Promise.all([...awardsPromises, ...typesPromises, ...keywordsPromises]);
        res.json(newGame);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.put("/", authMiddleware, async (req, res) => {
    try {
        const data = req.body
        const existingGame = await Games.findByPk(data.Id);

        if (!existingGame) {
            return res.status(404).json({ message: "Game not found" });
        }

        await existingGame.update({
            Name: data.Name,
            Brand: data.Brand,
            Age: data.Age,
            MinPlayer: data.MinPlayer,
            MaxPlayer: data.MaxPlayer,
            Release: data.Release ? data.Release : null,
            Description: data.Description,
        });

        await existingGame.setAwards([]);
        const awardsPromises = data.Awards.map(async award => {
            const [createdAward] = await Awards.findOrCreate({
                where: { Name: award.Name },
                defaults: { Name: award.Name }
            });
            await existingGame.addAward(createdAward);
        });


        await existingGame.setTypes([]);
        const typesPromises = data.Types.map(async type => {
            const [createdType] = await Types.findOrCreate({
                where: { Name: type.Name },
                defaults: { Name: type.Name }
            });
            await existingGame.addType(createdType);
        });

        await existingGame.setKeyWords([]);
        const keywordsPromises = data.KeyWords.map(async keyword => {
            const [createdKeyword] = await KeyWords.findOrCreate({
                where: { Name: keyword.Name },
                defaults: { Name: keyword.Name }
            });
            await existingGame.addKeyWord(createdKeyword);
        });

        await Promise.all([...awardsPromises, ...typesPromises, ...keywordsPromises]);
        res.json(existingGame);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.put("/rent", authMiddleware, async (req, res) => {
    console.log(req.body)
    try {
        Games.update({
            Status: "Loué"
        }, {
            where: {
                id: req.body.id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

})

module.exports = router;