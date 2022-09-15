export const io = require("socket.io-client");
export const socket = io("http://localhost:3000");
import * as readline from 'node:readline';

// variabile booleana settata a TRUE se viene ufficialmente stabilito un vincitore 
let timer_end = false

/**
 * Il server chiede al client di inserire un idUtente. Una volta inserito, si attiva
 * l'evento "join server". Lato server, viene assegnato un socket id e vengono salvati
 * i dati dell'utente all'interno di una lista.
 */
socket.on('message', (message: any) => {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(message, (answer: any) => {
        console.log("Il nome utente inserito è: ", answer);
        rl.close();
        socket.emit('join server', answer);
    });
})

/**
 * Salvati i dati relativi all'utente, il server restituisce la lista degli utenti
 * connessi al server.
 */
socket.on('new user', (message: any) => {
    console.log('utenti collegati: ', message);
})

/**
 * Lato server, viene inviato un messaggio al client in cui si chiede a quale asta
 * si vuole partecipare. Lato client, è possibile selezionare l'asta. La richiesta
 * poi viene processata dal server che verifica se il numero inserito è relativo
 * ad un asta esistente.
 */
socket.on('domanda', (message: any) => {
    var rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl2.question(message, function(answer: any) {
        console.log("L'asta selezionata è: ", Number(answer));
        rl2.close();
        socket.emit('join room', Number(answer));
    });
})

/**
 * Evento che si attiva lato server solo se la richiesta di partecipazione è
 * andata a buon fine. Viene restituito al client un messaggio di successo.
 */
socket.on('room joined', (message: any) => {
    console.log(message);
})

/**
 * Evento che si attiva lato server solo se la richiesta di partecipazione non
 * è andata a buon fine. Viene restituito al client un messaggio di errore.
 */
socket.on('not room joined', (message: any) => {
    console.log(message);
})

/**
 * Evento che si attiva lato server quando la richiesta di partecipazione va a
 * a buon fine. Si da la possibiltà al client di inserire un'offerta. L'offerta
 * viene poi inviata al server e processata.
 * 
 * Quando lato server scade il timer, viene dichiarato ufficialmente il vincitore
 * dell'asta. Questo evento comporta il settaggio della variabile 'timer_end' a
 * TRUE. Se 'timer_end' è TRUE e l'utente prova ad inviare un'offerta, viene
 * restituito un messaggio di errore.
 */
socket.on('offerta', (message: any) => {
    var rl3 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl3.question(message, function(answer: any) {
        console.log("La quota offerta è: ", Number(answer));
        rl3.close();
        const offerta = {
            quota: Number(answer),
            id: socket.id
        }
        if(!timer_end) socket.emit('offerta inviata', offerta);
        else console.log("Non è possibile inviare altre offerte: asta terminata");
    });
})

/**
 * Quando un'offerta viene processata correttamente, il server notifica a tutti i
 * client connessi che la lista delle offerte è stata aggiornata.
 */
socket.on('quota salvata', (message: any) => {
    console.log(message);
})

/**
 * Quando un'offerta non può essere processata correttamente, il server notifica,
 * all'utente da cui ha ricevuto la richiesta di salvare un'offerta, che l'offerta
 * non è stata processata, restituendo un messaggio di errore. A questo punto si da
 * all'utente la possibilità di inserire un'altra offerta.
 */
socket.on('quota non salvata', (message: any) => {
    //console.log(message);
    var rl4 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl4.question(message, function(answer: any) {
        console.log("La quota offerta è: ", Number(answer));
        rl4.close();
        const offerta = {
            quota: answer,
            id: socket.id
        }
        if(!timer_end) socket.emit('offerta inviata', offerta);
        else console.log("Non è possibile inviare altre offerte: asta terminata");
    });
})

/**
 * Lato server, viene stabilito l'utente vincitore. Il server notifica ai client connessi
 * chi risulta vincitore dell'asta, inviando il socket_id associato al vincitore.
 * 
 * Lato server, viene poi scalato il credito residuo. Il server notifica la vincitore
 * che il suo credito è cambiato, inviandogli il suo credito residuo.
 */
socket.on('winner', (winner: any) => {
    timer_end = true;
    console.log('il vincitore è ', winner);

    socket.on('credito residuo', (message: any) => {
        console.log('credito residuo: ', message);
    })
})