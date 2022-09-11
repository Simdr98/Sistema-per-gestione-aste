var express = require('express');
const jwt = require('jsonwebtoken');
var isBase64 = require('is-base64');

import * as utenteClass from "../ModelsDB/utente";
import * as astaClass from "../ModelsDB/asta";
import * as offertaClass from "../ModelsDB/offerta";

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import { controllerErrors } from "../Controller/controller";


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
            const risposta = getErrorMsg(ErrorMsgEnum.NoHeader).getMsg();
            next(risposta.testo);
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
    catch(error: any){
        next(controllerErrors(ErrorMsgEnum.NoToken, error, res));
    }
    
}
  
export function verifyAndAuthenticate(req: any, res: any, next: any){
    try{
        let decifrato = jwt.verify(req.token, process.env.KEY!);
        if(decifrato !== null){
            if((decifrato.ruolo === "admin" || 
            decifrato.ruolo === "bid_participant" || 
            decifrato.ruolo === "bid_creator") &&
            typeof decifrato.idUtente === "string"){
            req.idUtente = decifrato.idUtente
            req.ruolo = decifrato.ruolo
            next()
            } 
            else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectRole).getMsg();
                next(risposta.testo);
            }
            }
        else {
            const risposta = getErrorMsg(ErrorMsgEnum.NoTokenValid).getMsg();
            next(risposta.testo);
        }
    }
    catch(error: any){
        controllerErrors(ErrorMsgEnum.NoTokenValid, error, res);
    }
};

// Funzioni rotte
export async function controlloEsistenzaUtente(req: any, res: any, next: any){
    const check = await utenteClass.Utente.findByPk(req.idUtente)
    if(check !== null){
        next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoExistUtente).getMsg();
        next(risposta.testo);
    }
}


export async function controlloBidCreator(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        if(utente.ruolo === 'bid_creator'){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoAutorizationCreator).getMsg();
            next(risposta.testo);
        }
    })
}

export async function controlloBidParticipant(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        console.log(utente.ruolo);
        if(utente.ruolo === 'bid_participant'){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoAutorizationParticipant).getMsg();
            next(risposta.testo);
        }
    })
}

export async function controlloAdmin(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        if(utente.ruolo === 'admin'){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoAutorizationAdmin).getMsg();
            next(risposta.testo);
        }
    })
}

export async function controlloEsistenzaAsta(req: any, res: any, next: any){
    if(req.body.idAsta === undefined){
        const check = await astaClass.Asta.findByPk(req.query.idAsta)
        if(check !== null){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoExistAsta).getMsg();
            next(risposta.testo);
        } 
    }
    else{
        const check = await astaClass.Asta.findByPk(req.body.idAsta)
        if(check !== null){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoExistAsta).getMsg();
            next(risposta.testo);
        }
    }
}

export async function controlloCampiAsta(req: any, res: any, next: any){

    req.body.idUtente_creator = req.idUtente;

    if(typeof(req.body.idAsta) === 'number' && req.body.idAsta !== null
    && typeof(req.body.titolo_asta) === 'string' && req.body.titolo_asta !== null
    && (req.body.tipo_asta === 'English Auction' 
    || req.body.tipo_asta === 'First Price Sealed Bid Auction' 
    || req.body.tipo_asta === 'Second Price Sealed Bid Auction')
    && typeof(req.body.min_partecipanti) === 'number' && req.body.min_partecipanti !== null
    && typeof(req.body.max_partecipanti) === 'number' && req.body.max_partecipanti !== null
    && typeof(req.body.quota_iscrizione) === 'number' && req.body.quota_iscrizione !== null
    && typeof(req.body.min_prezzo_puntata) === 'number' && req.body.min_prezzo_puntata !== null
    && typeof(req.body.min_rialzo) === 'number' && req.body.min_rialzo !== null
    && typeof(req.body.durata_asta) === 'number' && req.body.durata_asta !== null){
        console.log('middleware campi asta superato');
        next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCreate).getMsg();
        next(risposta.testo);
    }
}

export async function controlloTipoAsta(req: any, res: any, next: any){
    if(req.body.tipo_asta === 'English Auction' 
    || req.body.tipo_asta === 'First Price Sealed Bid Auction' 
    || req.body.tipo_asta === 'Second Price Sealed Bid Auction'){
        next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoVisualizeAstaType).getMsg();
        next(risposta.testo);
    }
}

export async function controlloStatoAstaOfferta(req: any, res: any, next: any){
    astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) => {
        if(asta.stato === 'in esecuzione') next();
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectState).getMsg();
            next(risposta.testo);
        }
    });
}

export async function controlloStatoAsta(req: any, res: any, next: any){
    if(req.body.stato === 'non ancora aperta' 
    || req.body.stato === 'in esecuzione' 
    || req.body.stato === 'terminata'){
        next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoVisualizeAstaState).getMsg();
        next(risposta.testo);
    }
}

export async function controlloCodifica(req: any, res: any, next: any){
    if(isBase64(req.body)) await next();
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCrypt).getMsg();
        next(risposta.testo);
    }
}

export async function creditoSufficiente(req: any, res: any, next: any){
    req.body.idUtente = req.idUtente;
    await utenteClass.Utente.findByPk(req.body.idUtente).then((credito: any) => {
        if(credito.credito_token >= req.body.quota){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCredit).getMsg();
            next(risposta.testo);
        }
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
                   else{
                        const risposta = getErrorMsg(ErrorMsgEnum.NoBid).getMsg();
                        next(risposta.testo);
                   }
                });
        }
        else next();
    });
}

export async function controlloCampiOfferta(req: any, res: any, next: any){
    if(typeof(req.body.idOfferta) === 'number' && req.body.idOfferta !== null
    && typeof(req.body.quota) === 'number' && req.body.quota !== null
    && typeof(req.body.idAsta) === 'number' && req.body.idAsta !== null){
        await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
            if(req.body.quota >= asta.min_prezzo_puntata){
                next();
            }
            else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoMinBid).getMsg();
                next(risposta.testo);
            }
        });
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCreate).getMsg();
        next(risposta.testo);
    }
}

export async function controlloUtenteVincitore(req: any, res: any, next: any) {

    await astaClass.Asta.findByPk(req.body.idAsta).then((asta:any) => {
            if (asta.idUtente_vincitore === req.body.idUtente_vincitore) {
                next();
            }
            else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoWinner).getMsg();
                next(risposta.testo);
            }
        });
}

export async function controlloScalaCredito(req: any, res: any, next: any) {
    await astaClass.Asta.findByPk(req.body.idAsta).then((asta:any) => {
        if (asta.tot_prezzo_aggiudicato === req.body.cifra) {
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectCredit).getMsg();
            next(risposta.testo);
        }
    });
}

export function controlloCampiRicarica(req: any, res: any, next: any) {
    if ((Number.isInteger(req.body.quantita) && req.body.quantita>0)
        && (typeof req.body.idUtente_beneficiario === 'string' && req.body.idUtente_beneficiario !== null)){
            next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectRefill).getMsg();
        next(risposta.testo);
    }
}


//controlla la data nel formato stringa e nel formato GG-MM-AAAA ANCORA DA RISOLVERE
export function controlloData(req: any, res: any, next: any): void {
    if (req.body.data !== null) {
        const datastring = req.body.data;
        if (typeof req.body.data !== 'string'){
            const datastring = req.body.data.toString();
        }
        const checkData = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
        if ((checkData.test(datastring))) {
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectDate).getMsg();
            next(risposta.testo);
        }
    }
    else next();
}

export function esistenzaRotta(req: any, res: any, next: any) {
    const risposta = getErrorMsg(ErrorMsgEnum.NoRoute).getMsg();
    next(risposta.testo);
}