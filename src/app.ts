import express from "express"
import morgan from "morgan";
import { db } from "./models";
import userRoutes from './routes/userRoutes'

const app = express(); //creating an instance of the express application in a variable called app

app.use(morgan('dev')); // morgan package which helps with logging http requests

app.use(express.json()); // this line allows express to recieve and understand JSON data
app.use(express.urlencoded({extended:true})); // this allows express to parse url encoded payloads

app.use('/api/users', userRoutes)

db.sync().then(() => {
    console.info('connected to the canine adoption database!')
}) //creating a connection with the database mentioned in index.ts

app.listen(3000);