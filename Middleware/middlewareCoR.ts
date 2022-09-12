import * as middleware from '../Middleware/middleware';

export const JWT = [
    middleware.myLogger,
    middleware.checkHeader,
    middleware.checkToken,
    middleware.verifyAndAuthenticate
];

export const creaAsta = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidCreator,
    middleware.controlloCampiAsta
];

export const partecipaAsta = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant,
    middleware.controlloEsistenzaAsta,
    middleware.controlloStatoAstaPartecipazione,
    middleware.controlloPartecipanti
];

export const visualizzaAsteFiltroTipo = [
    
    middleware.controlloTipoAsta
];

export const visualizzaAsteFiltroStato = [
    middleware.controlloStatoAsta
];

export const creaOfferta = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant,
    middleware.controlloEsistenzaAsta, //controllare anche lo stato dell'asta (da implementare)
    middleware.controlloStatoAstaOfferta,
    middleware.controlloCodifica
    /*
    middleware.creditoSufficiente,
    middleware.controlloNumOfferte,
    middleware.controlloCampiOfferta
    */
];

export const controlloWallet = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant
];

export const visualizzaStoricoAsteRilanci = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant
];

export const scalaCredito = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloEsistenzaAsta,
    middleware.controlloAdmin,
    middleware.controlloUtenteVincitore,
    middleware.controlloScalaCredito
];

export const ricaricaWalletUtente = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloAdmin,
    middleware.controlloCampiRicarica
];

export const visualizzaStoricoAste = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant,
    middleware.controlloData
];

export const rottaSbagliata = [
    middleware.esistenzaRotta
];