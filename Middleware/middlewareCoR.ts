import * as middleware from '../Middleware/middleware';
/**
 * Chain of responsability utilizzata per richiamare i middleware in cascata
 */

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
    middleware.controlloPartecipanti,
    middleware.controlloCreditoPartecipazione
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
    middleware.controlloEsistenzaAsta,
    middleware.controlloIscrizioneAsta,
    middleware.controlloStatoAstaOfferta,
    middleware.controlloCodifica
];

export const controlloWallet = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant
];

export const visualizzaStoricoAsteRilanci = [
    middleware.controlloEsistenzaUtente,
    middleware.controlloBidParticipant
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