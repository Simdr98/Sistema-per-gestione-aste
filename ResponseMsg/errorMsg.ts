import {Msg} from "./Msg";

class NoAuth implements Msg {
    getMsg():{testo:string} {
        return {testo: "Nessuna autenticazione"}
    }
}


export enum ErrorMsgEnum {
    NoAuth,
}

export function getErrorMsg(type: ErrorMsgEnum): Msg{
    let msgval: Msg;
    switch(type){
        case ErrorMsgEnum.NoAuth:
            msgval = new NoAuth();
            break;
    }
    return msgval;
}
