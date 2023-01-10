const express = require('express')
const mongoose = require('mongoose');
const app = express();
const serverConfig = require('./config/server.config');

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/movie_booking', {family : 4}, (err) => {
    if(err) {
        console.log(`error occured during server connection!`);
    }
    else {
        console.log('connected to DB')
        app.listen(serverConfig.PORT, serverConfig.HOST, () => {
            console.log(`server is listening on ${serverConfig.HOST} : ${serverConfig.PORT}`);
        });
    }
});


app.get("/", (req, res) => {
    res.send(`"A Wink Away" Movie booking application`)       
});