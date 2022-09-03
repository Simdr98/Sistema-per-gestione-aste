import { Asta } from "../ModelsDB/asta";
import {Msg} from "./Msg";

class AstaCreata implements Msg {
    getMsg():{testo:string} {
        return {testo:"La creazione dell'asta è avvenuta correttamente"}
    }
}


export enum SuccessMsgEnum {
    AstaCreata,
}

export function getSuccessMsg(type: SuccessMsgEnum): Msg{
    let msgval: Msg;
    switch(type){
        case SuccessMsgEnum.AstaCreata:
            msgval = new AstaCreata();
            break;
    }
    return msgval;
}
