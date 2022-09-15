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


/**
 * Funzione che permette di creare un'asta (rotta: creaAsta).
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
 */
export async function creazioneAsta(req: any, res: any): Promise<void> {
    try {

        //memorizzazione della nuova asta nel database
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
            if(asta.tipo_asta === 'English Auction'){
                astaClass.Asta.update(
                    {room: req.body.idAsta}, 
                    {where:{
                        idAsta: req.body.idAsta
                        }
                    });
            };

            //se l'asta è asta a busta chiusa, allora viene associato un idChiave che rappresenta
            //il riferimento alla coppia di chiavi pubblica-privata che servirà poi per
            //la decriptazione del messaggio inviato dall'utente contenente la quota dell'offerta
            if(asta.tipo_asta === 'First Price Sealed Bid Auction' || asta.tipo_asta === 'Second Price Sealed Bid Auction' ){
                astaClass.Asta.update(
                    {idChiave: 1}, 
                    {where:{
                        idAsta: asta.idAsta
                        }
                    });
            }

            const nuova_risposta = getSuccessMsg(SuccessMsgEnum.AstaCreata).getMsg();
            res.status(nuova_risposta.codice).json({stato: nuova_risposta.testo, risultato:asta});
        });
    } catch{(error: any) => {
            controllerErrors(ErrorMsgEnum.NoCreate, error, res);
        }
    };   
}
    

/**
 * Funzione che permette di visualizzare l'elenco delle aste filtrate per il valore dello stato (rotta: visualizzaAsteFiltroStato)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
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


/**
 * Funzione che permette di visualizzare l'elenco delle aste filtrate per il valore dello stato 
 * che può essere "non ancora aperta", "in esecuzione"  o "terminata" (rotta: visualizzaAsteFiltroStato)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
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


/**
 * Funzione che permette di creare una nuova offerta per una data asta (rotta: creaOfferta)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
 * Se si tratta di un'asta a busta chiusa, quindi del tipo "First Price Sealed Bid Auction" oppure "Second Price Sealed Bid Auction"
 * allora il req contiene il messaggio decriptato con la chiave pubblica associata all'asta.
 * E' necessario avviare la procedura di decriptazione del messaggio, con l'utilizzo 
 * delle funzioni della libreria crypto per la creazione della chiave oggetto necessaria poi alla 
 * funzione di decrypt per effettuare la decriptazione del messaggio.
 */
 export async function creaOfferta(req: any, res: any): Promise<void> {
        await astaClass.Asta.findByPk(req.query.idAsta).then(async(asta: any) => {
        if(asta.tipo_asta === 'First Price Sealed Bid Auction' 
        || asta.tipo_asta === 'Second Price Sealed Bid Auction') {
            chiaviClass.Chiavi.findByPk(asta.idChiave).then((chiave: any) => {
            
            //memorizzazione del messaggio criptato in base64 dal campo msg del body della richiesta
            let messaggio_criptato = req.body.msg;

            //variabile per la memorizzazione del valore della chiave con l'header e il footer adeguati
            let chiavePrivataOK= '-----BEGIN ENCRYPTED PRIVATE KEY-----\n'+chiave.chiavePrivata+'\n-----END ENCRYPTED PRIVATE KEY-----';

            //creazione dell'oggetto chiave della chiave privata per la funzione di crypto-decrypting
            const chiave_privata = crypto.createPrivateKey({
                key: chiavePrivataOK,
                format: 'pem',
                type: 'pkcs8',
                passphrase: 'passphrase'});

            //conversione messaggio criptato da formato base64 a formato arrayBuffer
            const messaggio_criptatoBuffer = Buffer.from(messaggio_criptato, 'base64');

            //funzione di decrypt della libreria crypto, restituisce il messaggio in formato arrayBuffer
            const messaggio_decriptato = crypto.privateDecrypt({
                key: chiave_privata, 
                oaepHash:'sha256',
                passphrase: 'passphrase'
                }, messaggio_criptatoBuffer);

            //la struttura del messaggio decriptato è un json e contiene due campi, idOfferta e quota
            //si effettua, quindi, il parse per creare l'oggetto json 
            //e memorizzare i dati in due nuovi campi del body della richiesta (req.body)
            try {
                const obj = JSON.parse(messaggio_decriptato);
                req.body.idOfferta = obj.idOfferta;
                req.body.quota = obj.quota;
            } catch{(error: any) => {
                controllerErrors(ErrorMsgEnum.NoJSON, error, res);
                }
            };
        
            /*
            controlli sui valori del messaggio decriptato, nello specifico
            -controllo che il credito sia sufficiente, quindi almeno pari alla quota dell'offerta
            -controllo che l'offerta per l'asta sia ancora consentita (se busta chiusa, una sola consentita)
            -controllo che i campi del messaggio siano validi
            */
            try {
                middleware.creditoSufficiente(req, res);
                middleware.controlloNumOfferte(req, res);
                middleware.controlloCampiOfferta(req, res);
            } catch{(error: any) => {
                controllerErrors(ErrorMsgEnum.NoBid, error, res);
                }
            };

            //memorizzazione della nuova offerta nel database
            try {
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

            //caso: asta aperta quindi vengono effettuati direttamente i ontrolli 
            //sui valori dei campi del messaggio, senza operazione di decriptazione
            try {
                middleware.creditoSufficiente(req, res);
                middleware.controlloNumOfferte(req, res);
                middleware.controlloCampiOfferta(req, res);
            } catch{(error: any) => {
                controllerErrors(ErrorMsgEnum.NoBid, error, res);
                }
            };
                try {
                    //memorizzazione della nuova offerta nel database
                    await offertaClass.Offerta.create({idOfferta: req.body.idOfferta,
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
            }
        });
}


/**
 * Funzione che permette di visualizzare il credito residuo dell'utente (rotta: controlloCreditoToken)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
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


/**
 * Funzione che permette di visualizzare lo storico delle aste alle quali si sta partecipando 
 * con l'elenco degli eventuali rilanci (rotta: visualizzaStoricoAsteRilanci)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
 */
export async function storicoRilanci(req: any, res: any): Promise<void> {
    //visualizzazione di tutti i campi della tabella Offerta relativi alle aste di tipo "English Auction"
    //trattandosi di aste a busta aperta, il valore delle quote delle offerte possono essere visibili a tutti
    if(req.query.tipo_asta==='English Auction') {      
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
            //visualizzazione di tutti i campi della tabella Offerta relativi alle aste a busta chiusa
            //trattandosi di aste a busta chiusa, il valore delle quote delle offerte 
            //non possono essere visibili a tutti quindi non vengono mostrate nel risultato
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


/**
 * Funzione che permette di ricaricare il credito del portafolio dell'utente (rotta: ricaricaWalletUtente)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
 */
 export function ricaricaCredito(req: any, res:any):void{
    utenteClass.Utente.increment(['credito_token'], {by: req.body.quantita, where: { idUtente: req.body.idUtente_beneficiario }}).then((utentericaricato:any)=>{
        const nuova_risposta = getSuccessMsg(SuccessMsgEnum.CreditoRicaricato).getMsg();
        res.status(nuova_risposta.codice).json({stato:nuova_risposta.testo, risultato:utentericaricato});
        }).catch((error) => {
        controllerErrors(ErrorMsgEnum.NoRefill, error, res);
    });
}


//Funzione per effettuare la conversione da formato stringa a formato data, utile per la funzione successiva
const toDate = (data: any) => {
    const [day, month, year] = data.split("/")
    return new Date(year, month - 1, day)
}


/**
 * Funzione che permette di visualizzare lo storico delle aste alle quali si è partecipato,
 * distinguendo per quelle che sono state aggiudicate e non, anche specificando un range temporale.
 * (rotta: visualizzaStoricoAste)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server
 */
 export function listaStoricoAste(req: any, res: any): void{
        //per l'estrazione delle aste, si utilizza il valore del campo vincita, specificato nell'url della richiesta (req.query)
        //caso: nessuna specifica temporale indicata nella richiesta
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

        //caso: specifica temporale indicata nella richiesta: "da" una certa data
        if (req.body.da && !req.body.a) {
            const inputDa = toDate(req.body.da);
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

            //caso: specifica temporale indicata nella richiesta: "da" una certa data "a" una certa data
            else if (req.body.da && req.body.a) {
                const inputDa = toDate(req.body.da);
                const inputA = toDate(req.body.a);
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
 * Funzione che permette di effettuare l'iscrizione e la partecipazione ad una determinata asta
 * (rotta: partecipaAsta)
 * @param req l'oggetto che contiene la richiesta effettuata dall'utente
 * @param res la risposta restituita dal server 
 */

export async function partecipaAsta(req: any, res: any): Promise<void>{
    await astaClass.Asta.findByPk(req.body.idAsta).then((asta: any) => {

        //incremento del campo "num_pertecipanti" dell'asta alla quale si vuole iscriversi
        astaClass.Asta.increment(['num_partecipanti'],{by: 1,where:{idAsta: asta.idAsta}});
 
        const current_date = new Date();

        //memorizzazione della nuova partecipazione nel database
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

        //scala il prezzo della quota di iscrizione dal credito dell'utente iscritto all'asta
        utenteClass.Utente.decrement(['credito_token'],
                                    {by: asta.quota_iscrizione,
                                        where:
                                        {idUtente: req.idUtente}
                                    });

            //se l'asta raggiunge il numero minimo di partecipanti, allora il suo stato cambia
            //da "non ancora aperta" a "in esecuzione": da questo momento in poi gli utenti iscritti
            //hanno la possibilità di effettuare le prime offerte ed i rilanci
            if(asta.num_partecipanti === asta.min_partecipanti){
                astaClass.Asta.update(
                    {stato: 'in esecuzione'}, 
                    {where:{
                        idAsta: asta.idAsta
                        }
                    });

                //si imposta un timer pari ai minuti definiti nell'asta, all'atto della sua creazione.
                //al termine del timer, lo stato dell'asta viene impostato in "terminata", 
                //quindi nessun partecipante può effettuare nuovi rilanci. 
                //Inoltre viene richiamata la funzione aggiudicaVincitore.
                //Number(asta.durata_asta);
                let timer: number= asta.durata_asta*60*1000;
                console.log(timer);
                setTimeout(function () {
                    console.log("ASTA "+ asta.idAsta + " CHIUSA");
                    astaClass.Asta.update(
                            {stato: 'terminata'},
                            {where:{
                                    idAsta: asta.idAsta
                            }}
                    );
                    console.log('stato asta aggiornato. è terminata? ', asta.stato)
                    aggiudicaVincitore(asta.idAsta)
                }, timer);
            
            }
        });
}


/**
 * Funzione che, quando richiamata, avvia la procedura per la decretazione dell'utente vincitore dell'asta.
 * Suddetta procedura cambia a seconda che si tratti di un'asta a busta aperta oppure a busta chiusa.
 * @param idAsta ossia l'id identificativo dell'asta della quale si deve decretare il vincitore
 */
export function aggiudicaVincitore(idAsta: any) {
    astaClass.Asta.findByPk(idAsta).then((asta: any) => {
        
        //estrazione di tutte le offerte e rilanci effettuati per l'asta identificata dal parametro idAsta
        let offerte = offertaClass.Offerta.findAll({
            raw: true,
            where: {
                "idAsta": idAsta
            },
            order: [['quota', 'DESC']]
        }).then((offerte:any)=>{
            /*
            se la lunghezza dell'oggetto offerte è 0, significa che al termine del timer
            nessun partecipante ha effettuato un'offerta, quindi l'asta rimane nello stato "terminata"
            senza l'indicazione di alcun idUtente vincitore.
            */

            /*
            se la lunghezza dell'oggetto offerte è 1, significa che un solo partecipante 
            ha effettuato un'offerta, quindi il vincitore è lui.
            */
            if(offerte.length === 1)  {
                const idUtente_vincitore = offerte[0].idUtente;
                const tot_prezzo_aggiudicato = offerte[0].quota;
                faseVincita(idAsta, idUtente_vincitore, tot_prezzo_aggiudicato);
            }

            /*
            se tipo_asta=First Price Sealed Bid Auction allora l’utente con l’offerta più alta vince, 
            pagando un prezzo pari all’ammontare offerto da lui stesso.
            Si osservano tutte le offerte inviate dagli altri partecipanti, che sono state estratte
            e memorizzate con un ordinamento per quota discendente.
            Perciò il vincitore è il primo della lista e paga un prezzo pari alla sua offerta.
            */
            if(asta.tipo_asta === 'First Price Sealed Bid Auction') {
                const idUtente_vincitore = offerte[0].idUtente;
                const tot_prezzo_aggiudicato = offerte[0].quota;

            //Aggiudicato il vincitore, bisogna effettuare delle operazioni di aggiornamento
            //sull'utente vincitore, sull'asta, e sulle partecipazioni, quindi chiamata alla funzione
                faseVincita(idAsta, idUtente_vincitore, tot_prezzo_aggiudicato);
            }

            /*
            se tipo_asta=Second Price Sealed Bid Auction allora l’utente con l’offerta più alta vince, 
            però paga un prezzo pari all’ammontare offerto dal secondo offerente più alto.
            Si osservano tutte le offerte inviate dagli altri partecipanti, che sono state estratte
            e memorizzate con un ordinamento per quota discendente.
            Perciò il vincitore è il primo della lista e paga un prezzo pari alla seconda offerta.
            */
            if(asta.tipo_asta === 'Second Price Sealed Bid Auction') {
                const idUtente_vincitore = offerte[0].idUtente;
                const tot_prezzo_aggiudicato = offerte[1].quota;
                
            //Aggiudicato il vincitore, bisogna effettuare delle operazioni di aggiornamento
            //sull'utente vincitore, sull'asta, e sulle partecipazioni, quindi chiamata alla funzione
                faseVincita(idAsta, idUtente_vincitore, tot_prezzo_aggiudicato);
            }
                
            /*
            se tipo_asta=English Auction allora l’utente con l’offerta più alta vince,
            e risulta anche essere l'utente che ha effettuato l'ultimo rilancio.
            Perciò il vincitore è il primo della lista e paga un prezzo pari alla propria offerta.
            */
            if(asta.tipo_asta === 'English Auction') {
                const idUtente_vincitore = offerte[0].idUtente;
                const tot_prezzo_aggiudicato = offerte[0].quota;
                
            faseVincita(idAsta, idUtente_vincitore, tot_prezzo_aggiudicato);
            }
        });              
    });
}


/**
 * Funzione che, quando richiamata, avvia le procedure successive alla proclamazione del vincitore dell'asta.
 * Consiste nell'aggiornamento delle informazioni dell'asta, indicando l'idUtente vincitore e il totale prezzo finale,
 * dei dati sulla partecipazione dell'utente, impostando il campo vincita true e infine
 * nella scalatura del credito dell'utente vincitore per un ammontare pari al prezzo.
 * @param idAsta ossia l'id identificativo dell'asta
 * @param idUtente_vincitore ossia l'id identificativo dell'utente decretato vincitore
 * @param tot_prezzo_aggiudicato ossia il prezzo finale aggiudicato per l'oggetto dell'asta conclusa. 
 */
export async function faseVincita(idAsta: any, idUtente_vincitore: any, tot_prezzo_aggiudicato: any) {

    console.log("IL VINCITORE DELL'ASTA " + idAsta + " è: " + idUtente_vincitore);

    //aggiornamento informazioni dell'asta
    await astaClass.Asta.update(
        {
            idUtente_vincitore: idUtente_vincitore,
            tot_prezzo_aggiudicato: tot_prezzo_aggiudicato
        },
            {
            where:{idAsta: idAsta} 
            });

    //aggiornamento profilo di partecipazione dell'utente
    await partecipazioneClass.Partecipazione.update(
            {vincita: true},
            {where:
                {idAsta: idAsta,
                idUtente: idUtente_vincitore}
            });

    //aggiornamento del credito wallet dell'utente
    await utenteClass.Utente.decrement(
            ['credito_token'],
            {by: tot_prezzo_aggiudicato,
                where:{
                        idUtente: idUtente_vincitore
                }
            });
}