import * as controller from "./Controller/controller"
import * as middleware from "./Middleware/middlewareCoR"

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
app.get('/visualizzaStoricoAsteRilanci', middleware.visualizzaStoricoAsteRilanci, function (req: any, res: any) {    
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

app.get('*', middleware.rottaSbagliata);
app.post('*', middleware.rottaSbagliata);

app.listen(PORT, HOST);
console.log(`Il server è in running sulla porta ${PORT}`)