import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'utente' presente allinterno del DB
 */

export const Utente = connection.define('utente', {
    idUtente:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    credito_token:{
        type: DataTypes.INTEGER,
        primaryKey: false
    },

    ruolo:{
        type: DataTypes.STRING,
        primaryKey: true
    }
})