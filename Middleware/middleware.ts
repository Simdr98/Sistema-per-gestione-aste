var express = require('express');
const jwt = require('jsonwebtoken');
var isBase64 = require('is-base64');

import * as utenteClass from "../ModelsDB/utente";
import * as astaClass from "../ModelsDB/asta";
import * as offertaClass from "../ModelsDB/offerta";
import * as partecipazioneClass from "../ModelsDB/partecipazione";

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import { controllerErrors } from "../Controller/controller";
import { Partecipazione } from "../ModelsDB/partecipazione";

var app = express();

//FUNZIONI DEDICATE AL JWT
export function myLogger (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
};

/**
 * Funzione per controllare la presenza dell'header nella richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export function checkHeader(req: any, res: any, next: any){
      const authHeader = req.headers.authorization;
      if (authHeader) {
          next();
      }else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoHeader).getMsg();
            next(risposta.testo);
      }
};

/**
 * Funzione per controllare la presenza del JWT Token nella richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per effettuare la verifica e l'autenticazione dell'utente che invia la richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

//FUNZIONI DELLE ROTTE

/**
 * Funzione per controllare l'esistenza dell'utente che invia la richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare il ruolo di BidCreator dell'utente che invia la richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare il ruolo di BidParticipant dell'utente che invia la richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare il ruolo di Admin dell'utente che invia la richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare l'esistenza dell'asta indicata con l'idAsta nell'url della richiesta (req.query)
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export async function controlloEsistenzaAsta(req: any, res: any, next: any){
    const check = await astaClass.Asta.findByPk(req.query.idAsta)
        if(check !== null){
            next();
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoExistAsta).getMsg();
            next(risposta.testo);
        } 
}

/**
 * Funzione per controllare l'effettiva iscrizione dell'utente all'asta 
 * indicata nell'url della richiesta (req.query)
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
 export async function controlloIscrizioneAsta(req: any, res: any, next: any){
        await partecipazioneClass.Partecipazione.findOne({
            where: {
                idUtente: req.idUtente,
                idAsta: req.query.idAsta }
            }).then((iscritto: any) => {
                if(iscritto !== null){
                    next();
                }
                else{
                    const risposta = getErrorMsg(ErrorMsgEnum.NoJoinAsta).getMsg();
                    next(risposta.testo);
                } 
            });
}

/**
 * Funzione per controllare lo stato dell'asta indicata nel body della richiesta di partecipazione.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
 export async function controlloStatoAstaPartecipazione(req: any, res: any, next: any){
    await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
        if(asta.stato === 'in esecuzione' || asta.stato === 'non ancora aperta') next();
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectStateParticipate).getMsg();
            next(risposta.testo);
        }
    });
}

/**
 * Funzione per controllare il numero di partecipanti dell'asta 
 * indicata nel body della richiesta di partecipazione.
 * Se il numero è minore del max consentito -indicato dal BidCreator all'atto di creazione, 
 * allora l'utente può procedere con l'iscrizione all'asta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
 export async function controlloPartecipanti (req: any, res: any, next: any){
    astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
        if(asta.num_partecipanti < asta.max_partecipanti) next();
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoParticipate).getMsg();
            next(risposta.testo);
        }
    })
}

/**
 * Funzione per controllare il credito disponibile dell'utente:
 * se il credito del suo wallet è maggiore della quota di iscrizione -indicata dal BidCreator 
 * all'atto di creazione- allora l'utente può procedere con l'iscrizione all'asta indicata nel body della richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
 export async function controlloCreditoPartecipazione (req: any, res: any, next: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((credito: any) => {
            astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
                if(credito.credito_token >= asta.quota_iscrizione){
                    next();
                }
                else {
                    const risposta = getErrorMsg(ErrorMsgEnum.NoCredit).getMsg();
                    next(risposta.testo);
                }
            });
    });
}

/**
 * Funzione per controllare il valore del tipo_asta indicata nel body della richiesta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare lo stato dell'asta indicata nel body della richiesta di visualizzazione dell'elenco.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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

/**
 * Funzione per controllare la validità dei dati inseriti nei campi al momento della creazione di una nuova asta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
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
        next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCreate).getMsg();
        next(risposta.testo);
    }
}

/**
 * Funzione per controllare lo stato dell'asta indicata nell'url della richiesta (req.query)
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export async function controlloStatoAstaOfferta(req: any, res: any, next: any){
    astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) => {
        if(asta.stato === 'in esecuzione') next();
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectStateBid).getMsg();
            next(risposta.testo);
        }
    });
}

/**
 * Funzione per controllare che, solo nel caso di aste a busta chiusa,
 * il messaggio contenuto nel body della richiesta di offerta sia in formato base64
 * (importanto affinchè la procedura di decriptazione abbia esito positivo).
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export async function controlloCodifica(req: any, res: any, next: any){
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) => {
        if (asta.tipo_asta === 'English Auction') {
            next();
        }
        else {
            if(base64regex.test(req.body.msg)) next();
                    else{
                        const risposta = getErrorMsg(ErrorMsgEnum.NoCrypt).getMsg();
                        next(risposta.testo);
                    }
        }
    });
}

/**
 * Funzione per controllare il credito disponibile dell'utente:
 * se il credito del suo wallet è maggiore della quota offerta -indicata nel body della richiesta- 
 * allora l'utente può procedere con l'invio dell'offerta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 */
export async function creditoSufficiente (req: any, res: any){
    await utenteClass.Utente.findByPk(req.idUtente).then((credito: any) => {
        if(credito.credito_token >= req.body.quota){
            return;
        }
        else{
            const risposta = getErrorMsg(ErrorMsgEnum.NoCredit).getMsg();
            res.status(risposta.codice).json({stato:risposta.testo});
        }
    });
}

/**
 * Funzione per controllare il numero di offerte inviate dall'utente per l'asta indicata:
 * nel caso di aste a busta aperte, allora l'utente può effettuare più volte il rilancio;
 * nel caso di aste a bussta chiusa, invece, l'utente può effettuare l'offerta solo una volta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 */
export async function controlloNumOfferte(req: any, res: any){
    await astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) =>{
        if(asta.tipo_asta === 'First Price Sealed Bid Auction'
        || asta.tipo_asta === 'Second Price Sealed Bid Auction'){
            offertaClass.Offerta.findAll({
                where: {idUtente:req.idUtente}
            }).then((num: any) => {
                                if(num !== null) return;
                                else{
                                    const risposta = getErrorMsg(ErrorMsgEnum.NoBid).getMsg();
                                    res.status(risposta.codice).json({stato:risposta.testo});
                                }
                });
        }
        else return;
    });
}

/**
 * Funzione per controllare i valori dei campi dell'offerta effettuata dall'utente:
 * si controlla che idOfferta e quota siano due valori numerici e non nulli.
 * Inoltre, si controlla che il valore dell'offerta sia almeno pari al prezzo base, 
 * ossia il minimo valore di puntata richiesto per l'asta.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 */
export async function controlloCampiOfferta(req: any, res: any){
    if(typeof(req.body.idOfferta) === 'number' && req.body.idOfferta !== null
    && typeof(req.body.quota) === 'number' && req.body.quota !== null){
        await astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) => {
            if(req.body.quota >= asta.min_prezzo_puntata){
                return
            }
            else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoMinBid).getMsg();
                res.status(risposta.codice).json({stato:risposta.testo});
            }
        });
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCreate).getMsg();
        res.status(risposta.codice).json({stato:risposta.testo});
    }
}

/**
 * Funzione per controllare i valori della richiesta di ricarica credito a favore di un utente:
 * si controlla che la quantità sia un numero maggiore di 0.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export function controlloCampiRicarica(req: any, res: any, next: any) {
    if ((Number.isInteger(req.body.quantita) && req.body.quantita>0)
        && (typeof req.body.idUtente_beneficiario === 'string' && req.body.idUtente_beneficiario !== null)){
            next();
    }
    else{
        const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectRefill).getMsg();
        res.status(risposta.codice).json({stato:risposta.testo});
    }
}

/**
 * Funzione per controllare che la data inserita nella richiesta di visualizzazione dello storico delle aste
 * sia nel formato corretto, ovvero una stringa nel formato GG-MM-AAAA.
 * A tal proposito si utilizza una RegExp per effettuare il controllo.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */
export function controlloData(req: any, res: any, next: any): void {
    if (req.body.da || req.body.a) {

        //controllo del campo "da" della richiesta
        if (req.body.da) {
            const datastringDa = req.body.da;

            //se il valore non è una stringa, allora si effettua la conversione per il controllo con la RegExp
            if (typeof req.body.da !== 'string'){
                const datastringDa = req.body.da.toString();
                console.log(datastringDa, 'data ora è stringa')
            }
            const checkData = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d\d/);
            if ((checkData.test(datastringDa))) {
                console.log('data DA ok')
            }
            else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectDate).getMsg();
                res.status(risposta.codice).json({stato:risposta.testo});
            }
        }   
        //controllo del campo "a" della richiesta
        if (req.body.a) {
            const datastringA = req.body.a;
            //se il valore non è una stringa, allora si effettua la conversione per il controllo con la RegExp
            if (typeof req.body.a !== 'string'){
                const datastringA = req.body.a.toString();
                console.log(datastringA, 'data ora è stringa')
            }
            const checkData = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d\d/);
            if ((checkData.test(datastringA))) {
                console.log('data A ok')
            } else{
                const risposta = getErrorMsg(ErrorMsgEnum.NoCorrectDate).getMsg();
                res.status(risposta.codice).json({stato:risposta.testo});
            }
        }
        next();

    } else next();
}

/**
 * Funzione per controllare l'esistenza di una rotta indicata dall'utente nell'URL.
 * @param req parametro per la richiesta
 * @param res parametro per la risposta
 * @param next passaggio al prossimo middleware
 */      
export function esistenzaRotta(req: any, res: any, next: any) {
    const risposta = getErrorMsg(ErrorMsgEnum.NoRoute).getMsg();
    res.status(risposta.codice).json({stato:risposta.testo});
}