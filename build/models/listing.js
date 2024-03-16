"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDogConnection = exports.DogFactory = exports.DogListing = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class DogListing extends sequelize_1.Model {
}
exports.DogListing = DogListing;
function DogFactory(sequelize) {
    DogListing.init({
        dogId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        allergies: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: "none"
        },
        disability: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        tableName: 'dogListings',
        freezeTableName: true,
        sequelize
    });
}
exports.DogFactory = DogFactory;
function UserDogConnection() {
    user_1.User.hasMany(DogListing, { foreignKey: 'userId' });
    DogListing.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.UserDogConnection = UserDogConnection;
