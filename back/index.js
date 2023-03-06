const express = require("express")
const app = express()

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3001


app.use(express.json())

const db = require('./models')


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((err) => {
    console.log(err)
})


module.exports = app;