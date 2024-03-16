"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const listing_1 = require("./listing");
const dbName = 'dogAdoptionDb'; // name of the database, this needs to be created before database can be connected
const username = 'root'; // the username to access the local mysql 
const password = 'Password1!'; // the password to access the local mysql
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: '127.0.0.1', //IP address of database server set to the local host 
    port: 3306, //mysql port
    dialect: "mysql"
});
(0, user_1.UserFactory)(sequelize);
(0, listing_1.DogFactory)(sequelize);
(0, listing_1.UserDogConnection)();
exports.db = sequelize;
