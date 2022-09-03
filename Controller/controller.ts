import * as astaClass from "../ModelsDB/asta"

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import {SuccessMsgEnum, getSuccessMsg} from "../ResponseMsg/successMsg";


function controllerErrors(err_msg_enum:ErrorMsgEnum, testo:Error, res:any){
    console.log(testo);
    const nuovomessaggio = getErrorMsg(err_msg_enum).getMsg();
    res.status(nuovomessaggio.testo).json({Descrizione:nuovomessaggio.testo})
}



export async function creazioneAsta(req: any, res: any): Promise<void> {
    try {
        await astaClass.Asta.create(req.body).then((asta: any) => {
            //scrittura sul file di log delle info
            //dati aggiuntivi
            const data = { "id_asta": asta.idAsta }
            //creazione risposta

            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaCreata).getMsg();
            res.status(nuova_risposta.testo).json({Descrizione:nuova_risposta.testo});

        });
    } catch(error) {
        controllerErrors(ErrorMsgEnum.NoAuth, error, res);
    }
}