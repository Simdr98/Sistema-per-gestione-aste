import { error } from "console";
import * as astaClass from "../ModelsDB/asta"
import * as offertaClass from "../ModelsDB/offerta"
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
        await astaClass.Asta.create(req.body).then((asta: any) => {
            //scrittura sul file di log delle info
            //dati aggiuntivi
            const data = { "id_asta": asta.idAsta }
            //creazione risposta
    
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaCreata).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});
    
        });
    } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCreate, error, res);
        }
    };   
}
    
//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)

/**
 * controllo inserimento stringhe, controllo esistenza asta
 * @param tipo_asta 
 * @param res 
 */

export async function visualizzaAsteFiltroStato(tipo_asta: string, res: any): Promise<void> {
    if (tipo_asta == 'Asta inglese aperta'){
        astaClass.Asta.findAll({
            where: {tipo_asta: tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (tipo_asta == 'asta in busta chiusa e pagamento del prezzo più alto'){
        astaClass.Asta.findAll({
            where: {tipo_asta: tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.testo).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (tipo_asta == 'asta in busta chiusa e pagamento del secondo prezzo più alto'){
        astaClass.Asta.findAll({
            where: {tipo_asta: tipo_asta},
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

export async function visualizzaCredito(id: string, res: any): Promise<void>{
    try{
        utenteClass.Utente.findByPk(id).then((utente: any) => {
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


//funzione che permette di scalare il credito dell'utente che si è aggiudicata un'asta (rotta: scalaCredito)


//funzione che permette di ricare il credito del portafolio dell'utente (rotta: ricaricaWalletUtente)


//funzione che permette di visualizzare lo storico delle aste, aggiudicate o non, indicando il range temporale (rotta: visualizzaStoricoAste)