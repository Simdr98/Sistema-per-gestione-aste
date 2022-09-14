import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";
import { Asta } from "./asta";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'offerta' presente all'interno del DB
 */

export const Offerta = connection.define('offerta', {
    idOfferta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    quota:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    idUtente:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    idAsta:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    }
},
{
    modelName: 'offerta',
    timestamps: false,
    freezeTableName: true
});