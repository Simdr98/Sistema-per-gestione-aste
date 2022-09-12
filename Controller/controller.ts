const crypto = require('crypto');
import * as middleware from '../Middleware/middleware';

import * as astaClass from "../ModelsDB/asta";
import * as offertaClass from "../ModelsDB/offerta";
import * as partecipazioneClass from "../ModelsDB/partecipazione";
import * as utenteClass from "../ModelsDB/utente";
import * as chiaviClass from "../ModelsDB/chiavi";

const {Op} = require("sequelize");

import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
import {SuccessMsgEnum, getSuccessMsg} from "../ResponseMsg/successMsg";


export function controllerErrors(err_msg_enum:ErrorMsgEnum, testoerrore:Error, res:any){
    console.log(testoerrore);
    const nuovomessaggio = getErrorMsg(err_msg_enum).getMsg();
    res.status(nuovomessaggio.codice).send(nuovomessaggio.testo);
}


//funzione che permette di creare un'asta (rotta: creaAsta)

/**
 * controllo esistenza utente, verifica bid_creator, controllo inserimento stringhe vuote o non valide
 * @param req 
 * @param res 
 */

export async function creazioneAsta(req: any, res: any): Promise<void> {
    try {
        await astaClass.Asta.create({idAsta: req.body.idAsta, 
                                    idUtente_creator: req.idUtente, 
                                    titolo_asta: req.body.titolo_asta, 
                                    tipo_asta: req.body.tipo_asta, 
                                    min_partecipanti: req.body.min_partecipanti, 
                                    max_partecipanti: req.body.max_partecipanti, 
                                    quota_iscrizione: req.body.quota_iscrizione, 
                                    min_prezzo_puntata: req.body.min_prezzo_puntata, 
                                    min_rialzo: req.body.min_rialzo, 
                                    durata_asta: req.body.durata_asta, 
                                    stato: "non ancora aperta"}).then((asta: any) => {
            //UPDATE
            if(asta.tipo_asta === 'English Auction'){
                asta.room = 'room' + asta.idAsta;
            }
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaCreata).getMsg();
            res.status(nuova_risposta.codice).json({stato: nuova_risposta.testo, risultato:asta});
        });
    } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCreate, error, res);
        }
    };   
}
    
//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)
/**
 * controllo inserimento stringhe
 * @param tipo_asta 
 * @param res 
 */

export async function visualizzaAsteFiltroTipo(req: any, res: any): Promise<void> {
    if (req.body.tipo_asta == 'English Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.tipo_asta == 'First Price Sealed Bid Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
                const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
                res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.tipo_asta == 'Second Price Sealed Bid Auction'){
        astaClass.Asta.findAll({
            where: {tipo_asta: req.body.tipo_asta},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.codice).json({descrizione:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
}

//funzione che permette di visualizzare le aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)
/**
 * controllo inserimento stringhe
 * @param tipo_asta 
 * @param res 
 */

 export async function visualizzaAsteFiltroStato(req: any, res: any): Promise<void> {
    if (req.body.stato == 'non ancora aperta'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.stato == 'in esecuzione'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
    else if (req.body.stato == 'terminata'){
        astaClass.Asta.findAll({
            where: {stato: req.body.stato},
            raw: true
        }).then((risultato: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzata).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:risultato});
        }).catch((error) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
            });
    }
}

//funzione che permette di creare un'offerta (rotta: creaOfferta)
/**
 * controllo esistenza asta, controllo bid_partecipant, controllo num offerte se asta chiusa, controllo
 * inserimento stringhe vuote o non valide
 * 
 * MIDDLEWARE DA AGGIUNGERE: controllo iscrizione utente all'asta
 * @param req 
 * @param res 
 */

 export async function creaOfferta(req: any, res: any): Promise<void> {
    await astaClass.Asta.findByPk(req.query.idAsta).then((asta: any) => {
    if(asta.tipo_asta === 'First Price Sealed Bid Auction' 
       || asta.tipo_asta === 'Second Price Sealed Bid Auction'){
        chiaviClass.Chiavi.findByPk(asta.idChiave).then((chiave: any) => {
        
        //memorizzazione del messaggio criptato in base64 dal campo msg del body della richiesta
        let messaggio_criptato = req.body.msg;

        let chiavePrivataOK= '-----BEGIN ENCRYPTED PRIVATE KEY-----\n'+chiave.chiavePrivata+'\n-----END ENCRYPTED PRIVATE KEY-----';

        //creazione oggetto chiave per la funzione di crypto-decrypting
        const chiave_privata = crypto.createPrivateKey({
            key: chiavePrivataOK,
            format: 'pem',
            type: 'pkcs8',
            passphrase: 'passphrase'});

        //conversione messaggio da formato base64 a formato arrayBuffer
        const messaggio_criptatoBuffer = Buffer.from(messaggio_criptato, 'base64');

        // funzione di decryption
        const messaggio_decriptato = crypto.privateDecrypt({
            key: chiave_privata, 
            oaepHash:'sha256',
            passphrase: 'passphrase'
            }, messaggio_criptatoBuffer);

        //messaggio decriptato è in formato json e contiene due campi, idOfferta e quota. 
        //Si effettua il parse per creare l'oggetto json e morizzare i dati in due campi del body della richiesta
        try {
            const obj = JSON.parse(messaggio_decriptato);
            req.body.idOfferta = obj.idOfferta;
            req.body.quota = obj.quota;
        } catch{(error: any) => {
            console.log('messaggio non in formato json');
            }
        };
       

        try {
            middleware.creditoSufficiente;
            middleware.controlloNumOfferte;
            middleware.controlloCampiOfferta;
            offertaClass.Offerta.create({idOfferta: req.body.idOfferta,
                                        quota: req.body.quota,
                                        idUtente: req.idUtente,
                                        idAsta: req.query.idAsta}).then((offerta: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.OffertaCreata).getMsg();
            res.status(nuova_risposta.codice).json({stato: nuova_risposta.testo, risultato: offerta});
            });
        } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCredit, error, res);
            }
        };
        });
    }
    else{
        try {
                middleware.creditoSufficiente;
                middleware.controlloNumOfferte;
                middleware.controlloCampiOfferta;
                offertaClass.Offerta.create(req.body).then((offerta: any) => {
                const nuova_risposta = getSuccessMsg(SuccessMsgEnum.OffertaCreata).getMsg();
                res.status(nuova_risposta.codice).json({stato: nuova_risposta.testo, risultato: offerta});
            });
        } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCredit, error, res);
            }
        };
    }
    });
}

//funzione che permette di controllare se credito sufficiente per effettuare un rilancio (rotta: controlloWallet)
//implementazione nel middleware

//funzione che permette di visualizzare il credito residuo dell'utente (rotta: controlloCreditoToken)

/**
 * controllo inserimento id valido e non nullo, controllo bid_partecipant
 * @param id 
 * @param res 
 */

export async function visualizzaCredito(req: any, res: any): Promise<void>{
    try{
        utenteClass.Utente.findByPk(req.idUtente).then((utente: any) => {
            var risultato = {credito: utente.credito_token};
            
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoVisualizzato).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato});
        });
    } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoVisualizeCredito, error, res);
        }
    };
}

//funzione che permette di visualizza lo storico delle aste alle quali si sta partecipando con l'elenco dei rilanci (rotta: visualizzaStoricoAsteRilanci)
//rilanci visualizzati prima in ordine di idAsta 
//MODIFICARE PER NASCONDERE I RISLANCI DELLE ASTE A BUSTA CHIUSA

export async function storicoRilanci(req: any, res: any): Promise<void> {
    //visualizzazione di tutti i campi della tabella Offerta relativi alle aste di tipo "English Auction" a busta aperta
    if(req.query.tipo_asta==='English Auction') {  
        console.log('sei nell if');      
        astaClass.Asta.findAll({
            include: {
                model: offertaClass.Offerta,
                required: true,
                attributes: ['idOfferta', 'quota', 'idUtente', 'idAsta'],
            },
            where: {tipo_asta: req.query.tipo_asta},
            attributes: ['idAsta', 'idUtente_creator', 'titolo_asta', 'tipo_asta'],
            order:[['idAsta', 'DESC']]
          }).then((storicoAste1Rilanci:any)=>{
                console.log(storicoAste1Rilanci); 
                const nuova_risposta = getSuccessMsg(SuccessMsgEnum.StoricoVisualizzato).getMsg();
                res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAste1Rilanci});
                }).catch((error: any) => {
                controllerErrors(ErrorMsgEnum.NoStorico, error, res);
            });
    }
        else {
            //visualizzazione di tutti i campi tranne il valore della quota delle offerte e rilanci delle aste a busta chiusa
            console.log('sei nell else');  
            astaClass.Asta.findAll({
                include: {
                    model: offertaClass.Offerta,
                    required: true,
                    attributes: ['idOfferta', 'idUtente', 'idAsta'],
                },
                where: {tipo_asta: req.query.tipo_asta},
                attributes: ['idAsta', 'idUtente_creator', 'titolo_asta', 'tipo_asta'],
                order:[['idAsta', 'DESC']]
              }).then((storicoAsteRilanci:any)=>{
                    const nuova_risposta = getSuccessMsg(SuccessMsgEnum.StoricoVisualizzato).getMsg();
                    res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAsteRilanci});
                }).catch((error: any) => {
                    controllerErrors(ErrorMsgEnum.NoStorico, error, res);
                });
        }
}

//funzione che permette di scalare il credito dell'utente che si è aggiudicata un'asta (rotta: scalaCredito)
//CONTROLLARE SE INSERIRE NELL'OBSERVER !!!
/**
 * controllo se esistenza utente, controllo esistenza asta, controllo vincitore asta, controllo inserimento numero cifra credito,
 * @param req 
 * @param res 
 */
 export function scalaCredito(req: any, res:any):void{

    utenteClass.Utente.decrement(['credito_token'], {by: req.body.cifra, where: { idUtente : req.body.idUtente_vincitore }}).then((scala:any)=>{
        utenteClass.Utente.findOne({
            where: {
                idUtente: req.body.idUtente_vincitore,
            }
        }).then((utentescalato: any)=> {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoScalato).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:utentescalato});
        });
        
    }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoRefill, error, res);
    });
}


//funzione che permette di ricaricare il credito del portafolio dell'utente (rotta: ricaricaWalletUtente)
/**
 * controllo esistenza utente, controllo inserimento numero,
 * @param req 
 * @param res 
 */
 export function ricaricaCredito(req: any, res:any):void{
    utenteClass.Utente.increment(['credito_token'], {by: req.body.quantita, where: { idUtente: req.body.idUtente_beneficiario }}).then((ricarica:any)=>{
        utenteClass.Utente.findOne({
            where: {
                idUtente: req.body.idUtente_beneficiario,
            }
        }).then((utentericaricato: any)=> {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoRicaricato).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:utentericaricato});
        });
        
    }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoRefill, error, res);
    });
}


//FUNZIONE PER CONVERSIONE FORMATO STRINGA A FORMATO DATA
const toDate = (data: any) => {
    const [day, month, year] = data.split("/")
    return new Date(year, month - 1, day)
}


//funzione che permette di visualizzare lo storico delle aste, aggiudicate o non, indicando il range temporale (rotta: visualizzaStoricoAste)
/**
 * controllo esistenza utente, inserimento formato data
 * @param data 
 * @param res 
 */
 export function listaStoricoAste(req: any, res: any): void{
    console.log('sei nel controller');
        partecipazioneClass.Partecipazione.findAll({ 
            where: {
                idUtente: req.idUtente,
                vincita: req.query.vincita},
            raw: true
        }).then((storicoAste: any) => {
            if (!req.body.da && !req.body.a){
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataTempoNO).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAste});
            }
        }).catch((error: any) => {
                controllerErrors(ErrorMsgEnum.NoVisualizeAsta, error, res);
                });
        
        if (req.body.da && !req.body.a) {
            console.log('sei nel primo if');
            console.log(req.body.da);
            const inputDa = toDate(req.body.da);
            console.log(inputDa);
            partecipazioneClass.Partecipazione.findAll({ 
                where: {
                    idUtente: req.idUtente,
                    vincita: req.query.vincita,
                    data_iscrizione: {
                                        [Op.gte]: inputDa
                                    }}
            }).then((storicoAsteDa: any) => {
                    if(storicoAsteDa.isNull) {
                        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataRisNO).getMsg();
                        res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAsteDa});
                    }
                    else {
                        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataTempoSI).getMsg();
                        res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAsteDa});
                    }
                })
                }
            else if (req.body.da && req.body.a) {
                console.log('sei nel secondo if')
                const inputDa = toDate(req.body.da);
                const inputA = toDate(req.body.a);
                console.log(' ', inputDa, ' ', inputA);
                partecipazioneClass.Partecipazione.findAll({ 
                    where: {
                        idUtente: req.idUtente,
                        vincita: req.query.vincita,
                        data_iscrizione: {
                                [Op.between]: [inputDa, inputA]
                                }
                }
            }).then((storicoAsteDaA: any) => {
                    if(storicoAsteDaA.isNull) {
                        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataRisNO).getMsg();
                        res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAsteDaA});
                    }
                    else {
                        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaVisualizzataTempoSI).getMsg();
                        res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:storicoAsteDaA});
                    }
                })
            }
    } 

/**
 * Rotta => /partecipaAsta
 * Middleware => esistenza utente, ruolo bid_participant, esistenza asta, credito sufficiente(quota iscrizione), asta non ancora aperta o in esecuzione, num minimo o max partecipanti
 * @param req 
 * @param res 
 */
 let messages: object

export function partecipaAsta(req: any, res: any): void{
    astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {
        const num = asta.num_partecipanti + 1;
 
        astaClass.Asta.update(
            {num_partecipanti: num}, 
            {where:{
                idAsta: asta.idAsta
            }
        })
 
        if(asta.num_partecipanti === asta.min_partecipanti){
            astaClass.Asta.update(
                {stato: 'in esecuzione'}, 
                {where:{
                    idAsta: asta.idAsta
                }
            })
        }
         
        console.log(asta.stato);
 
        const current_date = new Date();

        partecipazioneClass.Partecipazione.create({idPartecipazione: req.body.idPartecipazione, 
                                                   idAsta: req.body.idAsta, 
                                                   idUtente: req.idUtente, 
                                                   costo_partecipazione: asta.quota_iscrizione, 
                                                   vincita: false, 
                                                   contatore_rilanci: 0, 
                                                   data_iscrizione: current_date}).then((iscrizione: any) => {
            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.IscrizioneSI).getMsg();
            res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:iscrizione});
        });
    });
 }