import * as middleware from '../Middleware/middleware';

export const JWT = [
    middleware.myLogger,
    middleware.checkHeader,
    middleware.checkToken,
    middleware.verifyAndAuthenticate,
    middleware.checkPayload
];

export const creaAsta = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidCreator,
    middleware.controlloCampiAsta
];

export const visualizzaAsteFiltroTipo = [
    
    middleware.controlloTipoAsta
];

export const visualizzaAsteFiltroStato = [
    middleware.controlloStatoAsta
];

export const creaOfferta = [
    middleware.controlloEsistenzaAsta,
    middleware.controlloBidParticipant,
    middleware.creditoSufficiente,
    middleware.controlloNumOfferte,
    middleware.controlloCampiOfferta
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
    middleware.controlloScalaCifra
];

export const ricaricaWalletUtente = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloAdmin,
    middleware.controlloCampiWallet,
    middleware.controlloRicaricaCifra
];

export const visualizzaStoricoAste = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant,
    middleware.controlloData
];

export const rottaSbagliata = [
    middleware.esistenzaRotta
];