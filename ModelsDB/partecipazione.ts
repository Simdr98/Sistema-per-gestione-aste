import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";
//import { timeStamp } from "console";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'partecipazione' presente all'interno del DB
 */

 export const Partecipazione = connection.define('partecipazione', {
    idPartecipazione:{
        type: DataTypes.INTEGER,
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

    data_iscrizione:{
        type: DataTypes.DATE,
        primaryKey: false, 
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP(3)')
    },

    socket_id: {
        type: DataTypes.STRING,
        primaryKey: false,
        defaultValue: null
    }
},
{
    modelName: 'partecipazione',
    timestamps: false,
    freezeTableName: true
})