import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { DogFactory, UserDogConnection } from "./listing";

const dbName = 'dogAdoptionDb'; // name of the database, this needs to be created before database can be connected
const username = 'root'; // the username to access the local mysql 
const password = 'Password1!'; // the password to access the local mysql

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1', //IP address of database server set to the local host 
    port: 3306, //mysql port
    dialect: "mysql"
});

UserFactory(sequelize);
DogFactory(sequelize);
UserDogConnection();

export const db = sequelize