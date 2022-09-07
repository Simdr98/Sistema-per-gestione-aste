var express = require('express');
const jwt = require('jsonwebtoken');
import * as utenteClass from "../ModelsDB/utente";
import * as astaClass from "../ModelsDB/asta";
import * as offertaClass from "../ModelsDB/offerta";
import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";

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
            else { console.log('inserimento ruolo non corretto') }
            }
        else{next( ErrorMsgEnum.NoTokenValid )}
    }
    catch(error){
        next(ErrorMsgEnum.NoTokenValid)
    }
};



export function checkPayload(req: any, res: any, next: any){
    if((req.ruolo === 'admin' || req.ruolo === 'bid_creator' || req.ruolo === 'bid_participant')
    && (typeof req.idUtente === 'string') && (req.idUtente.length <= 50)
    && (req.idUtente != null)){
        next();
    }
    else ErrorMsgEnum.NoAutorization;
}

// Funzioni rotte
export async function controlloEsistenzaUtente(req: any, res: any, next: any){
    const check = await utenteClass.Utente.findByPk(req.idUtente)
    if(check !== null){
        next();
    }
    else next(ErrorMsgEnum.NoExistUtente);
}


export async function controlloBidCreator(req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        if(utente.ruolo === 'bid_creator'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization + `: l'utente non ha i permessi di creatore`);
    })
}

export function controlloBidParticipant(req: any, res: any, next: any){
    utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        if(utente.ruolo === 'bid_participant'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization);
    })
}

export function controlloAdmin(req: any, res: any, next: any){
    utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
        if(utente.ruolo === 'admin'){
            next();
        }
        else next(ErrorMsgEnum.NoAutorization);
    })
}

export async function controlloEsistenzaAsta(req: any, res: any, next: any){
    const check = await astaClass.Asta.findByPk(req.body.idAsta)
    if(check !== null){
        next();
    }
    else next(ErrorMsgEnum.NoExistAsta);
}

export async function controlloCampiAsta(req: any, res: any, next: any){

    req.body.idUtente_creator = req.idUtente;

    if(typeof(req.body.idAsta) === 'number' && req.body.idAsta !== null
    && typeof(req.body.idUtente_creator) === 'string' && req.body.idUtente_creator !== null
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
        next();
    }
    else next(ErrorMsgEnum.NoCreate + ': il formato dei dati inseriti non è corretto');
}

export async function controlloTipoAsta(req: any, res: any, next: any){
    if(req.body.tipo_asta === 'English Auction' 
    || req.body.tipo_asta === 'First Price Sealed Bid Auction' 
    || req.body.tipo_asta === 'Second Price Sealed Bid Auction'){
        next();
    }
    else next(ErrorMsgEnum.NoVisualizeAsta + ': il tipo di asta inserito non esiste')
}

export async function controlloStatoAsta(req: any, res: any, next: any){
    if(req.body.stato === 'non ancora aperta' 
    || req.body.stato === 'in esecuzione' 
    || req.body.stato === 'terminata'){
        next();
    }
    else next(ErrorMsgEnum.NoVisualizeAsta + `:il tipo di stato dell'asta inserito non esiste`)
}

//SISTEMARE I REQ.IDUTENTE EVENUALMENTE

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
    && typeof(req.body.idAsta) === 'number' && req.body.idAsta !== null){
        await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
            if(req.body.quota >= asta.min_prezzo_puntata){
                next();
            }
            else next(ErrorMsgEnum.NoMinBid);
        });
    }
    else next(ErrorMsgEnum.NoCreate + ': il formato dei dati inseriti non è corretto');
}

export async function controlloUtenteVincitore(req: any, res: any, next: any) {

    await astaClass.Asta.findByPk(req.body.idAsta).then((asta:any) => {
            if (asta.idUtente_vincitore === req.body.idUtente) {
                next();
            }
            else next(ErrorMsgEnum.NoAutorization + `: l'utente non risulta il vincitore dell'asta`)
        });
}

export async function controlloScalaCifra(req: any, res: any, next: any) {
    await astaClass.Asta.findByPk(req.body.idAsta).then((asta:any) => {
        if (asta.tot_prezzo_aggiudicato === req.body.cifra) {
            next();
        }
        else next(ErrorMsgEnum.NoCorrect + `: la cifra non corrisponde al totale prezzo aggiudicato dell'asta`)
    });
}

export function controlloRicaricaCifra(req: any, res: any, next: any) {
    
    if (Number.isInteger(req.body.cifra) && req.body.cifra>0) {
            next();
    }
    else next(ErrorMsgEnum.NoCorrect + `: la cifra deve essere un numero e maggiore di 0`)
}

export function controlloCampiWallet(req: any, res: any, next: any) {
    if ((Number.isInteger(req.body.quantita) && req.body.quantita>0)
        && (typeof req.body.idUtente_beneficiario === 'string' && req.body.idUtente_beneficiario !== null)){
            next();
    }
    else next(ErrorMsgEnum.NoCorrect + `:la quantità deve essere un numero e maggiore di 0, l'idUtente deve essere una stringa non nulla`)
}


//controlla la data nel formato stringa e nel formato GG-MM-AAAA
export function controlloData(req: any, res: any, next: any): void {
    const datastring = req.body.data;
    if (typeof req.body.data !== 'string'){
        const datastring = req.body.data.toString();
    }
    const checkData = new RegExp(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/);
    if ((checkData.test(datastring))) {
        next();
    }
    else next(ErrorMsgEnum.NoCorrect + `: la data deve essere inserita nel formato GG/MM/AAAA`)
}

export function esistenzaRotta(req: any, res: any, next: any) {
    next(ErrorMsgEnum.NoRoute)
}

/*export function logErrors(err: any, req: any, res: any, next: any) {
      console.error(err.stack);
      next(err);
}*/