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

export enum ErrorMsgEnum {
    NoAuth,
    NoCreate,
    NoVisualizeAsta,
    NoVisualizeCredito,
    NoCredit,
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
    }
    return msgval;
}
