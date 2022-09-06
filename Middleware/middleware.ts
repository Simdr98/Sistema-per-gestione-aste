var express = require('express');
const jwt = require('jsonwebtoken');
import * as utenteClass from "../ModelsDB/utente";
import * as astaClass from "../ModelsDB/asta";
import * as offertaClass from "../ModelsDB/offerta";
import * as partecipazioneClass from "../ModelsDB/partecipazione";
import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import { where } from "sequelize/types";
import { count } from "console";
//const { isNewExpression } = require('typescript'); non sono sicuro serva
var app = express();

//FUNZIONI DEDICATE AL JWT

export function myLogger (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
};

/*export function requestTime (req: any, res: any, next: any) {
      req.requestTime = Date.now();
      next();
};*/
  
export function checkHeader(req: any, res: any, next: any){
      const authHeader = req.headers.authorization;
      if (authHeader) {
          next();
      }else{
          next(ErrorMsgEnum.NoHeader);
      }
};
  
export function checkToken(req: any, res: any, next: any){
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!=='undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token=bearerToken;
        next();
        }   
        else{
            res.sendStatus(403);
        }
    }
    catch(error){
        next(ErrorMsgEnum.NoToken);
    }
    
}
  
export function verifyAndAuthenticate(req: any, res: any, next: any){
    try{
        let decoded = jwt.verify(req.token, process.env.KEY!);
        if(decoded !== null){
            req.user = decoded;
            next();
        } 
    }
    catch(error){
        next(ErrorMsgEnum.NoTokenValid)
    }
}

export function checkPayload(req: any, res: any, next: any){
    if((req.utente.ruolo === 'Admin' || req.user.ruolo === 'bid_creator' || req.user.ruolo === 'bid_participant')
    && (typeof req.utente.idUtente === 'string') && (req.utente.idUtente.length <= 50)
    && (req.utente.idUtente != null)){
        next();
    }
    else ErrorMsgEnum.NoValidIdUtente;
}

// Funzioni rotte

export async function controlloEsistenzaUtente(req: any, res: any, next: any){
    const check = await utenteClass.Utente.findByPk(req.body.idUtente)
    if(check !== null){
        next();
    }
    else next(ErrorMsgEnum.NoExistUtente);
}

export async function controlloBidCreator(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.body.idUtente).then((ruolo: any) => {
        if(ruolo.ruolo === 'bid_creator'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization);
    })
}

export async function controlloBidParticipant(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.body.idUtente).then((ruolo: any) => {
        if(ruolo.ruolo === 'bid_Participant'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization);
    })
}

export async function controlloAdmin(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.body.idUtente).then((ruolo: any) => {
        if(ruolo.ruolo === 'Admin'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization);
    })
}

export async function controlloEsistenzaAsta(req: any, res: any, next: any){
    const check = await utenteClass.Utente.findByPk(req.body.idAsta)
    if(check !== null){
        next();
    }
    else next(ErrorMsgEnum.NoExistAsta);
}

export async function controlloCampiAsta(req: any, res: any, next: any){
    if(typeof(req.body.idAsta) === 'number' && req.body.idAsta != null
    && typeof(req.body.idUtente_creator) === 'string' && req.body.idUtente_creator != null
    && typeof(req.body.titolo_asta) === 'string' && req.body.titolo_asta != null
    && (req.body.tipo_asta === 'English Auction' 
    || req.body.tipo_asta === 'First Price Sealed Bid Auction' 
    || req.body.tipo_asta === 'Second Price Sealed Bid Auction')
    && typeof(req.body.min_partecipanti) === 'number' && req.body.min_partecipanti != null
    && typeof(req.body.max_partecipanti) === 'number' && req.body.max_partecipanti != null
    && typeof(req.body.quota_iscrizione) === 'number' && req.body.quota_iscrizione != null
    && typeof(req.body.min_prezzo_puntata) === 'number' && req.body.min_prezzo_puntata != null
    && typeof(req.body.min_rialzo) === 'number' && req.body.min_rialzo != null
    && typeof(req.body.durata_asta) === 'number' && req.body.durata_asta != null){
        next();
    }
    else next(ErrorMsgEnum.NoCreate + ': il formato dei dati inseriti non è corretto');
}

export async function controlloTipoAsta(req: any, res: any, next: any){
    if(req.body.stato === 'English Auction' 
    || req.body.stato === 'First Price Sealed Bid Auction' 
    || req.body.stato === 'Second Price Sealed Bid Auction'){
        next();
    }
    else next(ErrorMsgEnum.NoVisualizeAsta + ': il tipo di asta inserito non esiste')
}

export async function controlloStatoAsta(req: any, res: any, next: any){
    if(req.body.tipo_asta === 'non ancora aperta' 
    || req.body.tipo_asta === 'in esecuzione' 
    || req.body.tipo_asta === 'terminata'){
        next();
    }
    else next(ErrorMsgEnum.NoVisualizeAsta + `:il tipo di stato dell'asta inserito non esiste`)
}

export async function creditoSufficiente(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.body.idUtente).then((credito: any) => {
        if(credito.credito_token >= req.body.quota){
            next();
        }
        else next(ErrorMsgEnum.NoCredit);
    });
}

export async function controlloNumOfferte(req: any, res: any, next: any){
    await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) =>{
        if(asta.tipo_asta === 'First Price Sealed Bid Auction'
        || asta.tipo_asta === 'Second Price Sealed Bid Auction'){
            offertaClass.Offerta.findAll({
                where: {idUtente:req.body.idUtente}
            }).then((num: any) => {
                   if(num !== null) next();
                   else next(ErrorMsgEnum.NoBid);
                });
        }
        else next();
    });
}

export async function controlloCampiOfferta(req: any, res: any, next: any){
    if(typeof(req.body.idOfferta) === 'number' && req.body.idOfferta !== null
    && typeof(req.body.quota) === 'number' && req.body.quota !== null
    && typeof(req.body.idUtente) === 'string' && req.body.idUtente !== null
    && typeof(req.body.idAsta) === 'number' && req.body.idAsta != null){
        await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
            if(req.body.quota >= asta.min_prezzo_puntata){
                next();
            }
            else next(ErrorMsgEnum.NoMinBid);
        });
    }
    else next(ErrorMsgEnum.NoCreate + ': il formato dei dati inseriti non è corretto');
}

/*export function logErrors(err: any, req: any, res: any, next: any) {
      console.error(err.stack);
      next(err);
}*/