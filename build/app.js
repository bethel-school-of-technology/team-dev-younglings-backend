"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const app = (0, express_1.default)(); //creating an instance of the express application in a variable called app
app.use((0, morgan_1.default)('dev')); // morgan package which helps with logging http requests
app.use(express_1.default.json()); // this line allows express to recieve and understand JSON data
app.use(express_1.default.urlencoded({ extended: true })); // this allows express to parse url encoded payloads
models_1.db.sync().then(() => {
    console.info('connected to the canine adoption database!');
});
app.listen(3000);
