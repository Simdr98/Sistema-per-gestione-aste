import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";
import { Asta } from "./asta";
import { timeStamp } from "console";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'utente' presente all'interno del DB
 */

export const Utente = connection.define('utente', {
    idUtente:{
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },

    credito_token:{
        type: DataTypes.INTEGER(),
        primaryKey: false,
        allowNull: false
    },

    ruolo:{
        type: DataTypes.STRING(50),
        primaryKey: false,
        allowNull: false
    }
},
{
    modelName: 'utente',
    timestamps: false,
    freezeTableName: true
} );