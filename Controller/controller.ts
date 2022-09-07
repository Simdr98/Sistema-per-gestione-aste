import { error } from "console";
import * as astaClass from "../ModelsDB/asta"
import * as offertaClass from "../ModelsDB/offerta"
import * as partecipazioneClass from "../ModelsDB/partecipazione"
import * as utenteClass from "../ModelsDB/utente"

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import {SuccessMsgEnum, getSuccessMsg} from "../ResponseMsg/successMsg";


function controllerErrors(err_msg_enum:ErrorMsgEnum, testoerrore:Error, res:any){
    console.log(testoerrore);
    const nuovomessaggio = getErrorMsg(err_msg_enum).getMsg();
    res.status(nuovomessaggio.testo).json({Descrizione:nuovomessaggio.testo})
}


//funzione che permette di creare un'asta (rotta: creaAsta)

/**
 * controllo esistenza utente, verifica bid_creator, controllo inserimento stringhe vuote o non valide
 * @param req 
 * @param res 
 */

export async function creazioneAsta(req: any, res: any): Promise<void> {
    try {
        await astaClass.Asta.create({idAsta: req.body.idAsta, 
                                    idUtente_creator: req.idUtente, 
                                    titolo_asta: req.body.titolo_asta, 
                                    tipo_asta: req.body.tipo_asta, 
                                    min_partecipanti: req.body.min_partecipanti, 
                                    max_partecipanti: req.body.max_partecipanti, 
                                    quota_iscrizione: req.body.quota_iscrizione, 
                                    min_prezzo_puntata: req.body.min_prezzo_puntata, 
                                    min_rialzo: req.body.min_rialzo, 
                                    durata_asta: req.body.durata_asta, 
                                    stato: "non ancora aperta"}).then((asta: any) => {
            //dati aggiuntivi
            //const data = { "id_asta": asta.idAsta }
            //creazione risposta
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaCreata).getMsg();
            res.status(200).send(nuova_risposta.testo);
            //CONTROLLARE RES STATUS
            //res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
    
        });
    } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCreate, error, res);
        }
    };   
}
    
//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)
/**
 * controllo inserimento stringhe
 * @param tipo_asta 
 * @param res 
 */

export async function visualizzaAsteFiltroTipo(req: any, res: any): Promise<void> {
    if (req.body.tipo_asta == 'English Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.tipo_asta == 'First Price Sealed Bid Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.tipo_asta == 'Second Price Sealed Bid Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
}

//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)
/**
 * controllo inserimento stringhe
 * @param tipo_asta 
 * @param res 
 */

 export async function visualizzaAsteFiltroStato(req: any, res: any): Promise<void> {
    if (req.body.stato == 'non ancora aperta'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.stato == 'in esecuzione'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.stato == 'terminata'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
}

//funzione che permette di creare un'offerta (rotta: creaOfferta)
/**
 * controllo esistenza asta, controllo bid_partecipant, controllo num offerte se asta chiusa, controllo
 * inserimento stringhe vuote o non valide
 * @param req 
 * @param res 
 */

export async function creaOfferta(req: any, res: any): Promise<void> {   //controllo num offerte se asta chiusa
    try {
        await offertaClass.Offerta.create(req.body).then((offerta: any) => {
            //scrittura sul file di log delle info
            //dati aggiuntivi
            const data = { "id_offerta": offerta.idOfferta }
            //creazione risposta
    
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.OffertaCreata).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
    
        });
    } catch{(error: any) => {
        controllerErrors(ErrorMsgEnum.NoCredit, error, res);
        }
    };
}

//funzione che permette di controllare se credito sufficiente per effettuare un rilancio (rotta: controlloWallet)
//implementazione nel middleware

//funzione che permette di visualizzare il credito residuo dell'utente (rotta: controlloCreditoToken)

/**
 * controllo inserimento id valido e non nullo, controllo bid_partecipant
 * @param id 
 * @param res 
 */

export async function visualizzaCredito(req: any, res: any): Promise<void>{
    try{
        utenteClass.Utente.findByPk(req.body.id).then((utente: any) => {
            var risultato = {credito: utente.credito_token};
            
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoVisualizzato).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
        });
    } catch{
        (error: any) => {
            controllerErrors(ErrorMsgEnum.NoVisualizeCredito, error, res);
            }
    };
}

//funzione che permette di visualizza lo storico delle aste alle quali si sta partecipando con l'elenco dei rilanci (rotta: visualizzaStoricoAsteRilanci)
//rilanci visualizzati prima in ordine di idAsta e poi in ordine di offerta

export function storicoRilanci(req: any, res:any):void{
    offertaClass.Offerta.findAll({
            where:{idUtente : req.body.idUtente},
            include:[
            {
                model:offertaClass.Offerta,
                attributes:{ exclude: ['quota', 'idUtente'] },
                order:[[offertaClass.Offerta,'idAsta','ASC'], [offertaClass.Offerta, 'idOfferta', 'ASC']]
            }]
        }).then((storico:any)=>{
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.StoricoVisualizzato).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione: nuova_risposta.testo});
        }).catch((error: any) => {
            controllerErrors(ErrorMsgEnum.NoStorico, error, res);
        });
}

//funzione che permette di scalare il credito dell'utente che si è aggiudicata un'asta (rotta: scalaCredito)
//CONTROLLARE SE INSERIRE NELL'OBSERVER !!!
/**
 * controllo se esistenza utente, controllo esistenza asta, controllo vincitore asta, controllo inserimento numero cifra credito,
 * @param req 
 * @param res 
 */

export function scalaCredito(req: any, res:any):void{

    utenteClass.Utente.decrement(['credito_token'], {by: req.body.prezzo_finale, where: { idUtente : req.body.idUtente_vincitore }}).then((utente:any)=>{
        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoScalato).getMsg();
        res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo, /*utente:idUtente,accredito:ricarica*/ });
    }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoRefill, error, res);
    });
}


//funzione che permette di ricaricare il credito del portafolio dell'utente (rotta: ricaricaWalletUtente)
/**
 * controllo esistenza utente, controllo inserimento numero,
 * @param req 
 * @param res 
 */
 export function ricaricaCredito(req: any, res:any):void{
    utenteClass.Utente.increment(['credito_token'], {by: req.body.quantita, where: { idUtente: req.body.idUtente_beneficiario }}).then((utente:any)=>{
        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoRicaricato).getMsg();
    res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo, /*utente:idUtente,accredito:ricarica*/ });
    }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoRefill, error, res);
    });
}


//funzione che permette di visualizzare lo storico delle aste, aggiudicate o non, indicando il range temporale (rotta: visualizzaStoricoAste)
/**
 * controllo esistenza utente, inserimento formato data
 * @param data 
 * @param res 
 */
 export function listaStoricoAste(req: any, res: any): void{
    if (req.body.data==null){
        partecipazioneClass.Partecipazione.findAll({ 
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataTempoNO).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
        }).catch((error) => {
            controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
        });
    } else { 
        partecipazioneClass.Partecipazione.findAll({
        where: {timestamp_iscrizione : req.body.data}, 
        include: [
            {
                model:partecipazioneClass.Partecipazione,
                attributes:{ exclude: ['idPartecipazione', 'idAsta', 'idUtente', 'costo_partecipazione', 'contatore_rilanci', 'timestamp_iscrizione'] },
                order:[[partecipazioneClass.Partecipazione,'vincita','ASC']]
            }],
        raw: true
    }).then((risultato: any) => {
        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataTempoSI).getMsg();
        res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
    }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
    });
    }
}