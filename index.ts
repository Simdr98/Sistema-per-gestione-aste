import * as controller from "./Controller/controller"
import * as middleware from "./Middleware/middlewareCoR"
import * as ws from "./Socket.io/socket_config"

var express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

var myLogger = function (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
  };

app.use(myLogger);

//Rotta utilizzata per verificare se l'applicazione è stata avviata in modo corretto
app.get('/', function (req: any, res: any) {
    res.send('L\'applicazione è stata avviata correttamente')
});

//Rotta per la creazione dell'asta
app.post('/creaAsta', middleware.JWT, middleware.creaAsta, function (req: any, res: any) {    
    controller.creazioneAsta(req, res);
});

//Rotta per iscriversi ad una determinata asta
app.post('/partecipaAsta', middleware.JWT, middleware.partecipaAsta, function (req: any, res: any) {    
    controller.partecipaAsta(req, res);
})

//Rotta per la visualizzazione dell'elenco delle aste con il filtro del valore tipo
app.get('/visualizzaAsteFiltroTipo', middleware.visualizzaAsteFiltroTipo, function (req: any, res: any) {    
    controller.visualizzaAsteFiltroTipo(req, res);
});

//Rotta per la visualizzazione dell'elenco delle aste con il filtro del valore di stato
app.get('/visualizzaAsteFiltroStato', middleware.visualizzaAsteFiltroStato, function (req: any, res: any) {    
    controller.visualizzaAsteFiltroStato(req, res);
});

//Rotta per la creazione di una nuova offerta da parte di un utente
app.post('/creaOfferta',  middleware.JWT, middleware.creaOfferta, function (req: any, res: any) {    
    controller.creaOfferta(req, res);
});

//Rotta per la visualizzazione del credito residuo dell'utente
app.get('/controlloWallet', middleware.JWT, middleware.controlloWallet, function (req: any, res: any) {    
    controller.visualizzaCredito(req, res);
});

//Rotta per la visualizzazione dell'elenco delle aste ed i relativi rilanci
app.get('/visualizzaStoricoAsteRilanci', middleware.JWT, middleware.visualizzaStoricoAsteRilanci, function (req: any, res: any) {    
    controller.storicoRilanci(req, res);
});

//Rotta per ricaricare il credito del portafolio dell'utente
app.post('/ricaricaWalletUtente', middleware.JWT, middleware.ricaricaWalletUtente, function (req: any, res: any) {    
    controller.ricaricaCredito(req, res);
});

//Rotta per la visualizzazione dello storico delle aste, aggiudicate e non
app.get('/visualizzaStoricoAste', middleware.JWT, middleware.visualizzaStoricoAste, function (req: any, res: any) {    
    controller.listaStoricoAste(req, res);
});


app.get('*', middleware.rottaSbagliata);
app.post('*', middleware.rottaSbagliata);

app.listen(PORT, HOST);
console.log(`Il server è in running sulla porta ${PORT}`)

// Socket.io
const PORT2 = 3000;

export const app2 = express();

//Controlla se l'applicazione risulta avviata correttamente sulla porta 3000
app2.get('/', function (req: any, res: any) {
    res.send('L\'applicazione è stata avviata correttamente')
});

// lista in cui vengono salvati gli utenti che si connettono al server
const users: any = [];

let user: any;
let credito_residuo: any
let winner: string

// lista di aste alle quali si può partecipare. ve n'è presente una per simulare il funzionamento dell'app
const aste: any = [123];

// offerta iniziale che stabilisce il minimo rilancio iniziale
const offerta_iniziale = {
    quota: 5,
    id: 'admin'
}

// lista in cui vengono salvate le offerte relative ad un'asta
const offerte: any = [offerta_iniziale];

// funzione utilizzata per stabilire il vincitore dell'asta
function setWinner (utente: any, id: any){
    utente = id;
    return utente; 
}

// avvio connessione
ws.io.on('connection', (socket: any) => {
    socket.emit('message', 'Inserisci idUtente: ');

/**
 * Il server è in attesa che il client inserisca l'idUtente.
 * Ricevuto l'id, si attiva l'evento "join server". Il server nizializza un oggetto
 * contenente i dati dell'utente connesso e li salva nella lista 'users'.
 * In seguito chiede all'utente a quale asta vuole partecipare.
 */

    socket.on('join server', (username: any) => {
        user = {
            username,
            id: socket.id,
            credito: 2000
        }
        users.push(user);
        ws.io.emit('new user', users);
        socket.emit('domanda', 'Inserire idAsta alla quale si vuole partecipare: ');
    })

/**
 * Il server è in attesa che il client inserisca l'idAsta.
 * Ricevuto l'id, si attiva l'evento "join room". Se l'idAsta è presente nella lista 'aste',
 * l'utente si connette alla stanza, altrimenti si restituisce un messaggio di errore.
 */

    socket.on('join room', (roomName: any) => {
        if(roomName === aste[0]){
            socket.join(roomName);
            socket.emit('room joined', `Ti sei unito alla stanza: room${roomName}`);
            socket.emit('offerta', 'Digita una quota da offrire: ');
        } 
        else{
            socket.emit('not room joined', "l'asta non esiste");
            socket.emit('domanda', 'Inserire idAsta alla quale si vuole partecipare: ');
        }
    })

/**
 * Il server è in attesa che il client inserisca un'offerta.
 * Ricevuta la quota, se questa rispetta determinate condizioni, viene aggiunto alla
 * lista 'offerte' un oggetto contenente la quota inviata e il socket id di chi l'ha inviata.
 * Allo scadere di un timer, si stabilisce un vincitore e l'asta termina.
 */

    socket.on('offerta inviata', (offerta: any) => {
        let credito_utente: number;

        // si confronta l'id di chi invia l'offerta con gli id presenti nella lista 'users' 
        // per conoscere il credito dell'utente che inviato l'offerta
        if(offerta.id === users[0].id) credito_utente = users[0].credito;
        else if(offerta.id === users[1].id) credito_utente = users[1].credito;
        else credito_utente = users[2].credito;

        // se la quota inviata supera la quota dell'ultima offerta e se l'utente ha abbastanza credito
        // la quota viene accettata
        if(offerta.quota > offerte[offerte.length-1].quota && offerta.quota <= credito_utente){
            offerte.push(offerta);

            ws.io.emit('quota salvata', offerte);

            // l'utente relativo all'ultima offerta, presente nella lista 'offerte', viene momentaneamente
            // dichiarato vincitore dell'asta. Si sfrutta la funzione 'setWinner'.
            winner = setWinner(winner, offerta.id);
  
            /**
             * quando nella lista 'offerte' è presente almeno una quota inviata da un utente, si imposta un timer.
             * Allo scadere del timer, gli utenti non possone più inviare altre offerte, l'utente 'winner' viene
             * ufficialmente dichiarato vincitore dell'asta e gli viene scalato un credito pari alla quota da lui
             * offerta.
             */
            if(offerte.length === 2){
                setTimeout(() => {
                    console.log("il vincitore dell'asta è ", winner);
                    ws.io.emit('winner', winner);
                    
                    // si confronta l'id del winner con i socket_id presenti nella lista 'user'
                    // per scalare correttamente il credito
                    if(winner === users[0].id){
                        users[0].credito = users[0].credito - offerta.quota;
                        credito_residuo = users[0].credito
                        socket.to(winner).emit('credito residuo', credito_residuo);
                    }
                    else if(winner === users[1].id){
                        users[1].credito = users[1].credito - offerta.quota;
                        credito_residuo = users[1].credito
                        socket.to(winner).emit('credito residuo', credito_residuo);
                    }
                    else{
                        users[2].credito = users[2].credito - offerta.quota;
                        credito_residuo = users[2].credito
                        socket.to(winner).emit('credito residuo', credito_residuo);
                    }
                }, 10000)
        
            }
            // si da all'utente la possibilità di inviare un'altra offerta
            socket.emit('offerta', 'Digita una quota da offrire: ');
        }
        else{
            // se la quota inviata non rispetta determinate condizioni, si restituiscono dei messaggi di errore
            if(offerta.quota < offerte[offerte.length-1].quota) socket.emit('quota non salvata', "Esiste almeno un'offerta migliore o con stessa quota. Inserire un'altra offerta: ");
            else socket.emit('quota non salvata', "Credito non sufficiente. Inserire un'altra offerta: ");
        }
    })
})

// server in ascolto sulla porta 3000
ws.server.listen(PORT2, HOST);