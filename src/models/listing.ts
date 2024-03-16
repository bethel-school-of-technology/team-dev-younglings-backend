import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class DogListing extends Model<InferAttributes<DogListing>, InferCreationAttributes<DogListing>> {
    declare dogId: number;
    declare name: string;
    declare breed: string;
    declare age: number;
    declare allergies?: string; //maybe this should be done in the format of add button, where you can add more and more allergies, if there 
    declare disability: boolean;
    declare price: number;

    declare createAt?: Date;
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed:{
            type: DataTypes.STRING,
            allowNull: false
        },
        age:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        allergies:{
            type: DataTypes.STRING,
            allowNull: true
        },
        disability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        price:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        createAt:{
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