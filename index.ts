import * as controller from "./Controller/controller"
import { ErrorMsgEnum, getErrorMsg } from "./ResponseMsg/errorMsg";

var express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

/*var myLogger = function (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
  };

app.use(myLogger);*/

//CONTROLLARE E AGGIUNGERE RIFERIMENTI A COR OPPURE MIDDLEWARE

//Rotta utilizzata per verificare se l'applicazione è stata avviata in modo corretto
app.get('/', function (req: any, res: any) {
    res.send('L\'applicazione è stata avviata correttamente')
});

//Rotta per la creazione dell'asta
app.post('/creaAsta', function (req: any, res: any) {    
    controller.creazioneAsta(req, res);
});

//Rotta per la visualizzazione dell'elenco delle aste con il filtro del valore tipo
app.get('/visualizzaAsteFiltroTipo', function (req: any, res: any) {    
    controller.visualizzaAsteFiltroTipo(req, res);
});

//Rotta per la visualizzazione dell'elenco delle aste con il filtro del valore di stato
app.get('/visualizzaAsteFiltroStato', function (req: any, res: any) {    
    controller.visualizzaAsteFiltroStato(req, res);
});

//Rotta per la creazione di una nuova offerta da parte di un utente
app.post('/creaOfferta', function (req: any, res: any) {    
    controller.creaOfferta(req, res);
});

//Rotta per la visualizzazione del credito residuo dell'utente
app.get('/controlloWallet', function (req: any, res: any) {    
    controller.visualizzaCredito(req, res);
});

//Rotta per la visualizzazione dell'elenco delle aste ed i relativi rilanci
app.get('/visualizzaStoricoAsteRilanci', function (req: any, res: any) {    
    controller.storicoRilanci(req, res);
});

//Rotta per scalare il credito di un utente quando si aggiudica l'asta -da controllare
app.post('/scalaCredito', function (req: any, res: any) {    
    controller.scalaCredito(req, res);
});

//Rotta per ricaricare il credito del portafolio dell'utente
app.post('/ricaricaWalletUtente', function (req: any, res: any) {    
    controller.ricaricaCredito(req, res);
});

//Rotta per la visualizzazione dello storico delle aste, aggiudicate e non
app.get('/visualizzaStoricoAste', function (req: any, res: any) {    
    controller.listaStoricoAste(req, res);
});

//CONTROLLARE!!!
app.get('*', /*middleware.RottaSbagliata*/);
app.post('*', /*middleware.RottaSbagliata*/);

app.listen(PORT, HOST);
console.log(`Il server è in running sulla porta ${PORT}`)