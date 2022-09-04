import * as astaClass from "../ModelsDB/asta"

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import {SuccessMsgEnum, getSuccessMsg} from "../ResponseMsg/successMsg";


function controllerErrors(err_msg_enum:ErrorMsgEnum, testoerrore:Error, res:any){
    console.log(testoerrore);
    const nuovomessaggio = getErrorMsg(err_msg_enum).getMsg();
    res.status(nuovomessaggio.testo).json({Descrizione:nuovomessaggio.testo})
}


//funzione che permette di creare un'asta (rotta: creaAsta)

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
    } catch{(error:any) => {
        controllerErrors(ErrorMsgEnum.NoAuth, error, res);
                }
    };
}
    
//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)



//funzione che permette di creare un'offerta (rotta: creaOfferta)


//funzione che permette di controllare se credito sufficiente per effettuare un rilancio (rotta: controlloWallet)


//funzione che permette di visualizzare il credito residuo dell'utente (rotta: controlloCreditoToken)


//funzione che permette di visualizza lo storico delle aste alle quali si sta partecipando con l'elenco dei rilanci (rotta: visualizzaStoricoAsteRilanci)


//funzione che permette di scalare il credito dell'utente che si è aggiudicata un'asta (rotta: scalaCredito)


//funzione che permette di ricare il credito del portafolio dell'utente (rotta: ricaricaWalletUtente)


//funzione che permette di visualizzare lo storico delle aste, aggiudicate o non, indicando il range temporale (rotta: visualizzaStoricoAste)