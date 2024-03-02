import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    //User class deinition which decribes properties that will be present in User objects 

    declare userId: number;
    declare firstName: string;
    declare lastName: string;
    declare username: string;
    declare password: string;
    declare email: string;

    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function UserFactory (sequelize: Sequelize) {

    //creation of the UserFactory function which defines the columns that will be present for the user table in the databse. Each column definition includes the definition/description of the properties that a column may have. For example, the properties of the userId column are that it is a primary key which is filled with an auto incrementing value whenever a new row is created. 

    User.init({
        userId: {
            // userId is the primary key for this database table
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    })
}