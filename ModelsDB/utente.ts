import { Singleton } from "./SingletonDB";
import { DataTypes, Sequelize } from "sequelize";
import { Asta } from "./asta";

const connection: Sequelize = Singleton.getIstance().getConnection();

/**
 * Definizione oggetto 'utente' presente all'interno del DB
 */

export const Utente = connection.define('utente', {
    idUtente:{
        type: DataTypes.STRING,
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
});

export async function userExist(id: string):Promise<any>{
    let risultato: any;
    try{
        risultato = await Utente.findByPk(id, {raw:true});
    }
    catch{
        console.log("L'utente non esiste");
    }
};

export async function uAdmin(id:string):Promise<any>{
    let user: any;
    user = userExist(id);

    if(user.ruolo == 'admin' ) return user;
    else if(!user) return false;
    else return false;   
}

export async function uCreator(id:string):Promise<any>{
    let user: any;
    user = userExist(id);

    if(user.ruolo == 'bid_creator' ) return user;
    else if(!user) return false;
    else return false;   
}

export async function uPartecipant(id:string):Promise<any>{
    let user: any;
    user = userExist(id);

    if(user.ruolo == 'bid_participant') return user;
    else if(!user) return false;
    else return false;   
}