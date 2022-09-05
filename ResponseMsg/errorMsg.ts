import {Msg} from "./Msg";

class NoAuth implements Msg {
    getMsg():{testo:string} {
        return {testo: "Nessuna autenticazione."}
    }
}

class NoCreate implements Msg {
    getMsg():{testo:string} {
        return {testo: "La creazione dell'asta non è andata a buon fine."}
    }
}

class NoVisualizeAsta implements Msg {
    getMsg():{testo:string} {
        return {testo: "La visualizzazione dell'asta non è andata a buon fine."}
    }
}

class NoVisualizeCredito implements Msg {
    getMsg():{testo:string} {
        return {testo: "La visualizzazione del credito residuo non è andata a buon fine."}
    }
}

class NoCredit implements Msg {
    getMsg():{testo:string} {
        return {testo: "Credito insufficiente."}
    }
}

class NoRefill implements Msg {
    getMsg():{testo:string} {
        return {testo: "La ricarica del credito dell'utente non è andata a buon fine."}
    }
}

class NoStorico implements Msg {
    getMsg():{testo:string} {
        return {testo: "La visualizzazione dello storico delle aste non è andata a buon fine."}
    }
}

class NoHeader implements Msg {
    getMsg():{testo:string} {
        return {testo: "La richiesta non contiene l'header"}
    }
}

class NoToken implements Msg {
    getMsg():{testo:string} {
        return {testo: "Token inesistente"}
    }
}

class NoTokenValid implements Msg {
    getMsg():{testo:string} {
        return {testo: "Token non valido"}
    }
}

class NoValidIdUtente implements Msg {
    getMsg():{testo:string} {
        return {testo: "Id utente non valido"}
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
    NoValidIdUtente,
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
        case ErrorMsgEnum.NoValidIdUtente:
            msgval = new NoValidIdUtente();
            break;
    }
    return msgval;
}
