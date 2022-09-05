import * as middleware from '../Middleware/middleware';

export const JWT = [
    middleware.myLogger,
    middleware.checkHeader,
    middleware.checkToken,
    middleware.verifyAndAuthenticate,
    middleware.checkPayload
];

export const creaAsta = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloBidCreator
     * middleware.controlloCampiAsta (non vuoti, formattati bene, validi)
     */
];

export const visualizzaAsteFiltroTipo = [
    /**
     * middleware.controlloTipoAsta (controllo input utente => [uno dei valori presenti], input stringa)
     */
];

export const visualizzaAsteFiltroStato = [
    /**
     * middleware.controlloStatoAsta (controllo input utente => [uno dei valori presenti], input stringa)
     */
];

export const creaOfferta = [
    /**
     * middleware.controlloEsistenzaAsta
     * middleware.controlloBidParticipant
     * middleware.creditoSufficiente
     * middleware.controlloNumOfferte
     * middleware.controlloCampiOfferta (non vuoti, formattati bene, validi)
     */
];

export const controlloWallet = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloBidParticipant
     */
];

export const visualizzaStoricoAsteRilanci = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloBidParticipant
     */
];

export const scalaCredito = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloEsistenzaAsta
     * middleware.controlloAdmin
     * middleware.controlloUtenteVincitore (l'utente dev'essere il vincitore dell'asta)
     * middleware.controlloScalaCifra (controlla che la cifra scalata sia quella esatta)
     */
];

export const ricaricaWalletUtente = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloAdmin
     * middleware.controlloCampiWallet
     * middleware.controlloRicaricaCifra (int e >0)
     */
];

export const visualizzaStoricoAste = [
    /**
     * middleware.controlloEsistenzaUtente
     * middleware.controlloBidParticipant
     * middleware.controlloData (formato data valido e data valida)
     */
];

//export const rottaSbagliata[  Forse è meglio nell'index
    /**
     * middleware.esistenzaRotta
     */
//];