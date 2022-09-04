import { Asta } from "../ModelsDB/asta";
import {Msg} from "./Msg";

class AstaCreata implements Msg {
    getMsg():{testo:string} {
        return {testo:"La creazione dell'asta è avvenuta correttamente"}
    }
}

class AstaVisualizzata implements Msg {
    getMsg():{testo:string} {
        return {testo:"La visualizzazione dell'asta è avvenuta correttamente"}
    }
}

class CreditoVisualizzato implements Msg {
    getMsg():{testo:string} {
        return {testo:"La visualizzazione del credito è avvenuta correttamente"}
    }
}

class OffertaCreata implements Msg {
    getMsg():{testo:string} {
        return {testo:"La creazione dell'offerta è avvenuta correttamente"}
    }
}

class AstaVisualizzataTempoNO implements Msg {
    getMsg():{testo:string} {
        return {testo:"L'asta è stata visualizzata correttamente, senza specifica temporale."}
    }
}

class AstaVisualizzataTempoSI implements Msg {
    getMsg():{testo:string} {
        return {testo:"L'asta è stata visualizzata correttamente, con la specifica temporale."}
    }
}

class CreditoRicaricato implements Msg {
    getMsg():{testo:string} {
        return {testo:"Il credito token dell'utente è stato ricaricato correttamente."}
    }
}

class CreditoScalato implements Msg {
    getMsg():{testo:string} {
        return {testo:"Il credito token dell'utente è stato scalato correttamente con l'ammontare del prezzo aggiudicato finale."}
    }
}

class StoricoVisualizzato implements Msg {
    getMsg():{testo:string} {
        return {testo:"Lo storico delle aste a cui si è partecipato o si sta partecipando con gli eventuali rilanci è stato visualizzato correttamente."}
    }
}

/*class UtenteVincitore implements Msg {
    getMsg():{testo:string} {
        return {testo:"L'utente vincitore dell'asta è stato registrato correttamente."}
    }
}*/


export enum SuccessMsgEnum {
    AstaCreata,
    AstaVisualizzata,
    OffertaCreata,
    CreditoVisualizzato,
    AstaVisualizzataTempoNO,
    AstaVisualizzataTempoSI,
    CreditoRicaricato,
    CreditoScalato,
    //UtenteVincitore,
    StoricoVisualizzato,
}

export function getSuccessMsg(type: SuccessMsgEnum): Msg{
    let msgval: Msg;
    switch(type){
        case SuccessMsgEnum.AstaCreata:
            msgval = new AstaCreata();
            break;
        case SuccessMsgEnum.AstaVisualizzata:
            msgval = new AstaVisualizzata();
            break;
        case SuccessMsgEnum.OffertaCreata:
            msgval = new OffertaCreata();
            break;
        case SuccessMsgEnum.CreditoVisualizzato:
            msgval = new CreditoVisualizzato();
            break;
        case SuccessMsgEnum.AstaVisualizzataTempoNO:
            msgval = new AstaVisualizzataTempoNO();
            break;
        case SuccessMsgEnum.AstaVisualizzataTempoSI:
            msgval = new AstaVisualizzataTempoSI();
            break;
        case SuccessMsgEnum.CreditoRicaricato:
            msgval = new CreditoRicaricato();
            break;
        case SuccessMsgEnum.CreditoScalato:
            msgval = new CreditoScalato();
            break;
        /*case SuccessMsgEnum.UtenteVincitore:
            msgval = new UtenteVincitore();
            break;*/
        case SuccessMsgEnum.StoricoVisualizzato:
            msgval = new StoricoVisualizzato();
            break;
    }
    return msgval;
}
