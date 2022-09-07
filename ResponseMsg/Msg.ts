/*
 * Interfaccia che definisce come deve essere fatto il messaggio
 * (sia di errore che di successo) che il server restituisce al client
 */
export interface Msg {
    getMsg():{
        codice:number,
        testo:string
    };
}
