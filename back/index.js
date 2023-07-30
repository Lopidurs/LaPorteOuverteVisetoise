const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const db = require('./models')

// Routers
const GameRouter = require('./routes/Games')
app.use("/API/games", GameRouter)

const TypeRouter = require('./routes/Types')
app.use("/API/types", TypeRouter)

const KeyWordsRouter = require('./routes/KeyWords')
app.use("/API/keyWords", KeyWordsRouter)

const AwardsRouter = require('./routes/Awards')
app.use("/API/awards", AwardsRouter)

const UsersRouter = require('./routes/Users')
app.use("/API/users", UsersRouter)

const RentalsRouter = require('./routes/Rentals')
app.use("/API/rentals", RentalsRouter)

if (process.env.NODE_ENV !== 'test') {
    db.sequelize.sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`)
        });
    }).catch((err) => {
        console.log(err)
    })
}


module.exports = app;