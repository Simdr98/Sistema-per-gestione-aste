import * as controller from "./Controller/controller"
import * as middleware from "./Middleware/middlewareCoR"
import * as ws from "./Socket.io/socket_config"

var express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

/*
const io_client = require('socket.io-client');

const socket = io_client('http://localhost:3000');
*/

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

//Rotta per scalare il credito di un utente quando si aggiudica l'asta -da controllare
app.post('/scalaCredito', middleware.JWT, middleware.scalaCredito, function (req: any, res: any) {    
    controller.scalaCredito(req, res);
});

//Rotta per ricaricare il credito del portafolio dell'utente
app.post('/ricaricaWalletUtente', middleware.JWT, middleware.ricaricaWalletUtente, function (req: any, res: any) {    
    controller.ricaricaCredito(req, res);
});

//Rotta per la visualizzazione dello storico delle aste, aggiudicate e non
app.get('/visualizzaStoricoAste', middleware.JWT, middleware.visualizzaStoricoAste, function (req: any, res: any) {    
    controller.listaStoricoAste(req, res);
});

//Rotta per iscriversi ad una determinata asta
app.post('/partecipaAsta', middleware.JWT, middleware.partecipaAsta, function (req: any, res: any) {    
    controller.partecipaAsta(req, res);
})


app.get('*', middleware.rottaSbagliata);
app.post('*', middleware.rottaSbagliata);

app.listen(PORT, HOST);
console.log(`Il server è in running sulla porta ${PORT}`)

// Socket.io
const PORT2 = 3000;

export const app2 = express();

app2.get('/', function (req: any, res: any) {
    res.send('L\'applicazione è stata avviata correttamente')
});

const users: any = [];
const aste: any = [123, 456];

const offerta: any = {
    idUtente: [],
    quota: []
}

ws.io.on('connection', (socket: any) => {
    socket.emit('message', 'Inserisci idUtente: ');

    socket.on('join server', (username: any) => {
        const user = {
            username,
            id: socket.id
        }
        users.push(user);
        socket.emit('new user', users);
        socket.emit('domanda', 'Inserire idAsta alla quale si vuole partecipare: ');
    })

    socket.on('join room', (roomName: any) => {
        if(roomName === '123' || roomName === '456'){
            socket.join(roomName);
            socket.emit('room joined', `Ti sei unito alla stanza: ${roomName}`);
        } 
        else{
            socket.emit('not room joined', "l'asta non esiste");
            socket.emit('domanda', 'Inserire idAsta alla quale si vuole partecipare: ');
        }
        
    })
/*

    `

    socket.on('send message', (content: any, to: any, sender: any, chatName: any, isChannel: any) => {
        
    })
*/
})
    

ws.server.listen(PORT2, HOST);