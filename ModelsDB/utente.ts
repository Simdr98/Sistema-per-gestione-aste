import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'utente' presente all'interno del DB
 */

export const Utente = connection.define('utente', {
    idUtente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    credito_token:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    ruolo:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    }
})

//code