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

export enum ErrorMsgEnum {
    NoAuth,
    NoCreate,
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
    }
    return msgval;
}
