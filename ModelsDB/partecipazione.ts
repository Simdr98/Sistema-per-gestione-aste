import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";
//import { timeStamp } from "console";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'partecipazione' presente all'interno del DB
 */

 export const Partecipazione = connection.define('partecipazione', {
    idPartecipazione:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },

    idAsta:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    idUtente:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    costo_partecipazione:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    vincita:{
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false
    },

    contatore_rilanci:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    timestamp_iscrizione:{
        type: DataTypes.TIME,
        primaryKey: false,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3)')
    }
})