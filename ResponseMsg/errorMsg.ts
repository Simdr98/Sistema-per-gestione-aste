import {Msg} from "./Msg";

//autenticazione per i ruoli degli utenti, autorizzazione per le azioni permesse agli utenti
class NoAuth implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Nessuna autenticazione"}
    }
}

class NoCreate implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La creazione non è andata a buon fine"}
    }
}

class NoVisualizeAsta implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione dell'asta non è andata a buon fine"}
    }
}

class NoVisualizeCredito implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione del credito residuo non è andata a buon fine"}
    }
}

class NoCredit implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Credito insufficiente"}
    }
}

class NoRefill implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La ricarica del credito dell'utente non è andata a buon fine"}
    }
}

class NoStorico implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione dello storico delle aste non è andata a buon fine"}
    }
}

class NoHeader implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La richiesta non contiene l'header"}
    }
}

class NoToken implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Token inesistente"}
    }
}

class NoTokenValid implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Token non valido"}
    }
}

class NoCorrectRole implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Il ruolo inserito nel token non è corretto"}
    }
}

class NoAutorization implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Id utente non valido"}
    }
}

class NoExistUtente implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 404 ,testo: "Utente inesistente"}
    }
}

class NoExistAsta implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 404, testo: "Asta inesistente"}
    }
}

class NoMinBid implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La quota inserita non raggiunge la puntata minima"}
    }
}

class NoBid implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Offerta non consentita"}
    }
}

class NoCorrect implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Dati non corretti"}
    }
}

class NoRoute implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La rotta è inesistente"}
    }
}

export enum ErrorMsgEnum {
    NoAuth,
    NoCreate,
    NoVisualizeAsta,
    NoVisualizeCredito,
    NoCredit,
    NoRefill,
    NoStorico,
    NoHeader,
    NoToken,
    NoTokenValid,
    NoCorrectRole,
    NoAutorization,
    NoExistUtente,
    NoExistAsta,
    NoMinBid,
    NoBid,
    NoCorrect,
    NoRoute
}

export function getErrorMsg(type: ErrorMsgEnum): Msg{
    let msgval: Msg;
    switch(type){
        case ErrorMsgEnum.NoAuth:
            msgval = new NoAuth();
            break;
        case ErrorMsgEnum.NoCreate:
            msgval = new NoCreate();
            break;
        case ErrorMsgEnum.NoVisualizeAsta:
            msgval = new NoVisualizeAsta();
            break;
        case ErrorMsgEnum.NoCredit:
            msgval = new NoCredit();
            break;
        case ErrorMsgEnum.NoVisualizeCredito:
            msgval = new NoVisualizeCredito();
            break;
        case ErrorMsgEnum.NoRefill:
            msgval = new NoRefill();
            break;
        case ErrorMsgEnum.NoStorico:
            msgval = new NoStorico();
            break;
        case ErrorMsgEnum.NoHeader:
            msgval = new NoHeader();
            break;
        case ErrorMsgEnum.NoToken:
            msgval = new NoToken();
            break;
        case ErrorMsgEnum.NoTokenValid:
            msgval = new NoTokenValid();
            break;
        case ErrorMsgEnum.NoCorrectRole:
            msgval = new NoCorrectRole();
            break;
        case ErrorMsgEnum.NoAutorization:
            msgval = new NoAutorization();
            break;
        case ErrorMsgEnum.NoExistUtente:
            msgval = new NoExistUtente();
                break;
        case ErrorMsgEnum.NoExistAsta:
            msgval = new NoExistAsta();
                break;
        case ErrorMsgEnum.NoMinBid:
            msgval = new NoMinBid();
                break;
        case ErrorMsgEnum.NoBid:
            msgval = new NoBid();
                break;
        case ErrorMsgEnum.NoCorrect:
            msgval = new NoCorrect();
                break;
        case ErrorMsgEnum.NoRoute:
            msgval = new NoRoute();
                break;
    }
    return msgval;
}
