import express from "express"
import morgan from "morgan";
import { db } from "./models";

const app = express(); //creating an instance of the express application in a variable called app

app.use(morgan('dev')); // morgan package which helps with logging http requests

app.use(express.json()); // this line allows express to recieve and understand JSON data
app.use(express.urlencoded({extended:true})); // this allows express to parse url encoded payloads

db.sync().then(() => {
    console.info('connected to the canine adoption database!')
})

app.listen(3000);