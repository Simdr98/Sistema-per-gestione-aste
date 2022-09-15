import {Msg} from "./Msg";

class AstaCreata implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice:201, testo:"La creazione dell'asta è avvenuta correttamente"}
    }
}

class AstaVisualizzata implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"La visualizzazione dell'asta è avvenuta correttamente"}
    }
}

class IscrizioneSI implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"L'iscrizione è avvenuta con successo."}
    }
}

class CreditoVisualizzato implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"La visualizzazione del credito è avvenuta correttamente"}
    }
}

class OffertaCreata implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 201, testo:"La creazione dell'offerta è avvenuta correttamente"}
    }
}

class AstaVisualizzataTempoNO implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"Il risultato della ricerca è stato visualizzato correttamente, senza specifica temporale"}
    }
}

class AstaVisualizzataTempoSI implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"Il risultato della ricerca è stato visualizzato correttamente, con la specifica temporale"}
    }
}

class AstaVisualizzataRisNO implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"Il risultato della ricerca è visualizzato correttamento ma nullo per questo utente."}
    }
}

class CreditoRicaricato implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 201, testo:"Il credito token dell'utente è stato ricaricato correttamente"}
    }
}

class CreditoScalato implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 201, testo:"Il credito token dell'utente è stato scalato correttamente con l'ammontare del prezzo aggiudicato finale"}
    }
}

class StoricoVisualizzato implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 200, testo:"Lo storico delle aste a cui si è partecipato o si sta partecipando con gli eventuali rilanci è stato visualizzato correttamente"}
    }
}

export enum SuccessMsgEnum {
    AstaCreata,
    AstaVisualizzata,
    IscrizioneSI,
    OffertaCreata,
    CreditoVisualizzato,
    AstaVisualizzataTempoNO,
    AstaVisualizzataTempoSI,
    AstaVisualizzataRisNO,
    CreditoRicaricato,
    CreditoScalato,
    StoricoVisualizzato
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
        case SuccessMsgEnum.IscrizioneSI:
            msgval = new IscrizioneSI();
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
        case SuccessMsgEnum.AstaVisualizzataRisNO:
            msgval = new AstaVisualizzataRisNO();
            break;
        case SuccessMsgEnum.CreditoRicaricato:
            msgval = new CreditoRicaricato();
            break;
        case SuccessMsgEnum.CreditoScalato:
            msgval = new CreditoScalato();
            break;
        case SuccessMsgEnum.StoricoVisualizzato:
            msgval = new StoricoVisualizzato();
            break;
    }
    return msgval;
}
