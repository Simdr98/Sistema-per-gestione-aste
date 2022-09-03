import { Singleton } from "./SingletonDB";
import { DataTypes, ForeignKeyConstraintError, Sequelize } from "sequelize";
import { isCryptoKey } from "util/types";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'asta' presente all'interno del DB
 */

export const Asta = connection.define('asta', {
    idAsta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    idUtente_creator:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    titolo_asta:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    tipo_asta:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    min_partecipanti:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    max_partecipanti:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    quota_iscrizione:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    min_prezzo_puntata:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    min_rialzo:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    durata_asta:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },

    stato:{
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false
    },

    idUtente_vincitore:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        defaultValue: null
    },

    tot_prezzo_aggiudicato:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        defaultValue: 0
    },

    idChiave:{
        type: DataTypes.INTEGER,
        primaryKey: false,
        defaultValue: null
    }

})

/*
export async function astaExist(id: number):Promise<any>{
    let risultato: any;
    try{
        risultato = await Asta.findByPk(id, {raw:true});
    }
    catch{
        console.log("L'asta non esiste");
    }
};
*/