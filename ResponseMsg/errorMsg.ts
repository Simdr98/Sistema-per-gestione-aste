import {Msg} from "./Msg";

//autenticazione per i ruoli degli utenti, autorizzazione per le azioni permesse agli utenti
class NoAuth implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Nessuna autenticazione"}
    }
}

class NoCreate implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La creazione non è andata a buon fine: il formato dei dati inseriti non è corretto"}
    }
}

class NoVisualizeAsta implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione dell'asta non è andata a buon fine: nessuna asta esistente"}
    }
}

class NoVisualizeAstaType implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione dell'asta non è andata a buon fine: il tipo di asta inserito non esiste"}
    }
}

class NoVisualizeAstaState implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La visualizzazione dell'asta non è andata a buon fine: lo stato dell'asta inserito non esiste"}
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

class NoAutorizationCreator implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Id utente non valido: l'utente non ha i permessi di creatore"}
    }
}

class NoAutorizationParticipant implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Id utente non valido: l'utente non ha i permessi di partecipante"}
    }
}

class NoAutorizationAdmin implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Id utente non valido: l'utente non ha i permessi di amministratore"}
    }
}

class NoWinner implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Id utente non valido: l'utente non risulta il vincitore dell'asta"}
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

class NoCorrectCredit implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Dati non corretti: la cifra non corrisponde al totale prezzo aggiudicato dell'asta"}
    }
}

class NoCorrectRefill implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Dati non corretti: l'idUtente_beneficiario deve essere una stringa non nulla, la quantità deve essere un numero e maggiore di 0"}
    }
}

class NoCorrectDate implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "Dati non corretti: la data deve essere inserita nel formato AAAA-MM-GG"}
    }
}

class NoRoute implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "La rotta è inesistente"}
    }
}

class NoCrypt implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "il messaggio non risulta codificato"}
    }
}

class NoCorrectState implements Msg {
    getMsg():{codice:number, testo:string} {
        return {codice: 400, testo: "non è possibile effettuare l'offerta: l'asta non è in esecuzione"}
    }
}

export enum ErrorMsgEnum {
    NoAuth,
    NoCreate,
    NoVisualizeAsta,
    NoVisualizeAstaType,
    NoVisualizeAstaState,
    NoVisualizeCredito,
    NoCredit,
    NoRefill,
    NoStorico,
    NoHeader,
    NoToken,
    NoTokenValid,
    NoCorrectRole,
    NoAutorizationCreator,
    NoAutorizationParticipant,
    NoAutorizationAdmin,
    NoWinner,
    NoExistUtente,
    NoExistAsta,
    NoMinBid,
    NoBid,
    NoCorrectCredit,
    NoCorrectRefill,
    NoCorrectDate,
    NoRoute,
    NoCrypt,
    NoCorrectState
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
        case ErrorMsgEnum.NoVisualizeAstaType:
            msgval = new NoVisualizeAstaType();
            break;
        case ErrorMsgEnum.NoVisualizeAstaState:
            msgval = new NoVisualizeAstaState();
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
        case ErrorMsgEnum.NoAutorizationCreator:
            msgval = new NoAutorizationCreator();
            break;
        case ErrorMsgEnum.NoAutorizationParticipant:
            msgval = new NoAutorizationParticipant();
            break;
        case ErrorMsgEnum.NoAutorizationAdmin:
            msgval = new NoAutorizationAdmin();
            break;
        case ErrorMsgEnum.NoAutorizationAdmin:
            msgval = new NoAutorizationAdmin();
            break;
        case ErrorMsgEnum.NoWinner:
            msgval = new NoWinner();
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
        case ErrorMsgEnum.NoCorrectCredit:
            msgval = new NoCorrectCredit();
            break;
        case ErrorMsgEnum.NoCorrectRefill:
            msgval = new NoCorrectRefill();
            break;
        case ErrorMsgEnum.NoCorrectDate:
            msgval = new NoCorrectDate();
            break;
        case ErrorMsgEnum.NoRoute:
            msgval = new NoRoute();
            break;
        case ErrorMsgEnum.NoCrypt:
            msgval = new NoCrypt();
            break;
        case ErrorMsgEnum.NoCorrectState:
            msgval = new NoCorrectState();
            break;
    }
    return msgval;
}