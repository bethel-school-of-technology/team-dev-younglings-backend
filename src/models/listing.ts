import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class DogListing extends Model<InferAttributes<DogListing>, InferCreationAttributes<DogListing>> {
    declare dogId: number;
    declare age: number;
    declare price: number;
    declare userId: number
    declare name: string;
    declare breed: string;
    declare allergies: string; 
    declare disability: boolean;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function DogFactory (sequelize: Sequelize){


    DogListing.init({
        dogId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed:{
            type: DataTypes.STRING,
            allowNull: false
        },
        allergies:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "none"
        },
        disability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'dogListings',
        freezeTableName: true,
        sequelize
    })
}

export function UserDogConnection (){
    User.hasMany(DogListing, {foreignKey: 'userId'});
    DogListing.belongsTo(User, {foreignKey: 'userId'});
}