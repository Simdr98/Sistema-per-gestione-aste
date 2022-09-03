import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'chiave' presente all'interno del DB
 */

export const Chiavi = connection.define('chiavi', {
    idChiave:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    chiavePrivata:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    chiavePubblica:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    }
})

export async function userExist(id: number):Promise<any>{
    let risultato: any;
    try{
        risultato = await Chiavi.findByPk(id, {raw:true});
    }
    catch{
        console.log("Chiave non valida");
    }
};