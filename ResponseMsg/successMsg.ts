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


export enum SuccessMsgEnum {
    AstaCreata,
    AstaVisualizzata,
    OffertaCreata,
    CreditoVisualizzato,
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
    }
    return msgval;
}
