const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Users } = require("../models")
const argon2 = require('argon2');
const authMiddleware = require('../middleware/authMiddleware')

router.get("/", authMiddleware, async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.get("/details", authMiddleware, async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.query.id } })
        res.json(user)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await Users.findOne({ where: { Email } });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const isPasswordValid = await argon2.verify(user.Password, Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const accessToken = jwt.sign({ userId: user.id, isStaff: user.isStaff, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        user.Password = undefined;
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: 'nathansancke.com'
        }).status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.body.Password) {
            const hashedPassword = await argon2.hash(req.body.Password);
            req.body.Password = hashedPassword;
        }
        req.body.id = null;
        const newUser = await Users.create(req.body);
        newUser.Password = undefined;
        res.json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", authMiddleware, async (req, res) => {
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