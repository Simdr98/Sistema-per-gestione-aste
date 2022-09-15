# Progetto di programmazione avanzata: sistema per gestione aste

## Obiettivo del progetto
Realizzazione di un sistema (lato back-end) che consente di gestire delle aste, in particolare tre tipologie di aste:
-asta inglese aperta (“English Auction”): l’asta è di tipo ascendente, cioè vince il prezzo massimo. L’asta inglese,è la più nota forma di asta ed è quella tipicamente utilizzata per le aggiudicazioni di oggetti d’arte. Nell'implementazione del progetto, i concorrenti sono riuniti in una stanza associata all’asta (mediante websocket) e si svolge attraverso un banditore che parte dal più basso prezzo accettabile, detto base d’asta, e che sollecita le offerte al rialzo fino a quando nessuna offerta viene superata da un altro compratore. In questo caso si realizzino anche dei semplici client per simulare un’asta con un numero minimo di partecipanti pari a tre. 
– asta in busta chiusa e pagamento del prezzo più alto (“First Price Sealed Bid Auction”), nella quale gli offerenti inseriscono la loro offerta in una busta sigillata e la consegnano al banditore. Le buste, successivamente, sono aperte e l’individuo con l’offerta più alta vince l’asta, pagando un prezzo pari all’ammontare offerto. La simultaneità temporale non è essenziale, ciò che conta è che quando un offerente formula la propria offerta, entro il termine fissato, non conosca le offerte fatte dagli altri; 
– asta in busta chiusa e pagamento del secondo prezzo più alto (“Second Price Sealed Bid Auction”), nella quale gli offerenti inseriscono la loro offerta in una busta sigillata e la consegnano al banditore. Le buste, successivamente, sono aperte e l’individuo con l’offerta più alta vince l’asta, pagando un prezzo pari al secondo ammontare offerto più alto. Questo tipo di asta viene anche detto “asta di Vickrey”.


L'accesso al sistema avviene tramite autenticazione JWT e ad ogni utente deve essere associato e riconosciuto il proprio ruolo.
Si ammettono tre tipi di utenti: 
* Bid-partecipant: rappresenta l'utente che può partecipare alle aste aperte, effettuare una prima offerta e/o eventualmente rilanci e gestire il proprio "wallet" ossia il credito;
* Bid-creator: rappresenta l'utente che crea l'asta dell'oggetto in vendita e sceglie il tipo di asta;
* Admin: rappresenta l'utente che esegue azioni su richiesta degli altri utenti del sistema.

I token JWT sono stati generati tramite il seguente sito:
* [JWT.io](https://jwt.io/) utilizzando la chiave segreta "chiaveprogettoaste".

– Creare una nuova asta specificando la tipologia ed i parametri (necessaria autenticazione mediante token JWT con ruolo bid-creator) 
– Visualizzare l’elenco delle aste filtrando per non ancora aperte, in esecuzione, terminate. Questa tipologia di richiesta non deve essere autenticata. 
– Opzionare / creare una nuova offerta per una data asta (necessaria autenticazione mediante token JWT con ruolo bid-participant)
– Gestire per ogni utente il proprio “wallet” / portafoglio ovvero per ogni utente deve essere gestito il suo credito sotto forma di token. All’atto di un “rilancio” / offerta è necessario verificare la capienza dell’utente; se il credito non è disponibile allora la richiesta deve essere rifiutata. necessaria autenticazione mediante token JWT con ruolo bid-participant) 
– Dare la possibilità all’utente di verificare il proprio credito residuo (necessaria autenticazione mediante token JWT con ruolo bid-participant) 
– Visualizzare lo storiche delle aste alle quali si è partecipato / si sta partecipando listando tutti gli eventuali rilanci. 
– All’atto della aggiudicazione scalare il credito all’utente che risulta vincitore secondo la strategia dell’asta. 
– Creare una rotta che consenta ad un utente admin di ricaricare un dato utente (necessaria autenticazione mediante token JWT con ruolo admin). 
– Visualizzare lo storico delle aste alle quali si è partecipato distinguendo per quelle che sono state aggiudicate e non (l’utente può specificare un range temporale); necessaria autenticazione mediante token JWT con ruolo bid-participant)

## Richieste
Le specifiche richieste per l'implementazione sono:

Tipo          | Rotta                         | Autenticazione JWT   |Ruolo
------------- | ----------------------------- |----------------------|-----------------
Post          | /creaAsta                     | si                   |bid-creator
Post          | /partecipaAsta                | si                   |bid-partecipant
Post          | /rilancia                     | si                   |bid-partecipant
Post          | /ricaricaUtente               | si                   |Admin
Get           | /verificaCreditoResidio       | si                   |bid-partecipant
Get           | /elencoRilanci                | si                   |bid-partecipant & bid-creator
Get           | /storicoAste                  | si                   |bid-partecipant
Get           | /speseEffettuate              | si                   |bid-partecipant
Get           | /stats                        | si                   |Admin
Get           | /visualizzaAsteByStato        | no                   | - 

## Rotte
Nel seguente paragrafo si descrivono in maniera dettagliata tutte le rotte utilizzate nel progetto. 
Tutti i raw data inviati dall'utente vengono validati nel middleware controllando i relativi tipi e le relazioni che intercorrono tra di essi (ad esempio un utente può effettuare una offerta ad una asta solo se è riconosciuto il suo ruolo di bid_partecipant, se il credito è sufficiente e se effettivamente risulta iscritto all'asta). 
Inoltre, si effettua un collegamento con il database MySQL ove necessario (ad esempio se si vuole ottenere la lista di tutti i rilanci effettuati verso una determinata asta, allora si prendono i dati memorizzati in due tabelle).



## Diagrammi UML
### Diagramma dei casi d'uso
![use_case_diagram](resources/use_case_diagram.png)
### Diagramma delle sequenze
#### rotta1

#### rotta1

#### rotta1

#### rotta1

#### rotta1

...

## Pattern utilizzati
## Design pattern creazionali
### Singleton
Il Singleton è un design pattern creazionale che coinvolge una singola classe, responsabile della creazione dell'oggetto assicurandosi che venga creato una sola volta, garantendo però l'accesso globale ad una determinata istanza.
Il costruttore di default è privato, per prevenire l'uso dell'operatore "New" associato alla classe Singleton.
In questa classe si definisce un metodo statico che funge da costruttore: quando richiamato l'oggetto verrà creato solamente in assenza di un'ulteriore istanza.
Nel nostro caso è stato utilizzato per garantire che durante l'esecuzione del programma venga aperta una singola connessione con il database, garantendo la consistenza delle query svolte su di esso. 


### Factory Method
Il Factory Method è un design pattern creazionale che fornisce un'interfaccia per la creazione di oggetti in una super classe, ma permette alle sottoclassi di modificare il tipo di oggetti che saranno creati. Si usa quindi l'interfaccia per istanziare oggetti diversi.
Nel nostro progetto è stato utilizzato per la generazione dei messaggi di errore e di successo da ritornare al client.

## Design pattern comportamentali
### Chain of Responsability
La Chain of Responsability è un design pattern comportamentale che consente di far passare le richieste lungo una catena di gestori (handlers). Un handler è un particolare oggetto autonomo. Alla ricezione di una richiesta, ciascun handler ha lo scopo di effettuare una verifica e un controllo di quello che viene passato, e sulla base di ciò decide di elaborare la richiesta o di passarla al successivo handler della catena. 
E' necessario implementare un pattern di questo tipo al crescere della complessità dell'applicazione, infatti più saranno i controlli che devono esser fatti sulle richieste e più il codice sarebbe confusionario e duplicato senza un meccanisco di handler in serie.
La catena di responsabilità può essere interrotta: difatti un gestore può decidere di non inoltrare la richiesta più in basso nella catena e interrompere qualsiasi ulteriore elaborazione; e può essere fatto per due motivi: o la richiesta è stata elaborata dall’handler in questione oppure il controllo della richiesta non è andato a buon fine quindi l’handler restituisce errore e la catena si interrompe.

Ogni handlers collegato prende la richiesta come argomento e dispone di un campo per memorizzare un riferimento al gestore successivo nella catena. Oltre a elaborare una richiesta, i gestori trasmettono la richiesta ulteriormente lungo la catena. La richiesta viaggia lungo la catena fino a quando tutti i gestori non hanno avuto la possibilità di elaborarla 
Nel nostro progetto se la richiesta riesce ad attraversare tutti i middleware di una determinata catena, verrà a quel punto elaborata dal controller.

## Middleware
E' un pattern che consente di gestire la validazione della richiesta effettuate dal client attraverso una serie di strati software che la richiesta deve oltrepassare per poter essere processata dal modulo core.
Funzioni che hanno accesso all'oggetto richiesta (req), all'oggetto risposta (res) e alla successiva funzione middleware nel ciclo richiesta-risposta dell'applicazione. La funzione middleware successiva è comunemente indicata da una variabile denominata next.
Viene utilizzato per controllare se è presente nell'header il parametro authorization, per validare e controllare la presenza del token JWT, per validare i dati inviati dall'utente ed infine per gestire gli errori.


## Avvio del progetto
> Per poter eseguire il progetto è necessario avere installato [Docker](https://www.docker.com) sulla propria macchina.

Per procedere con l'esecuzione del progetto effettuare i seguenti passaggi:

 - Clonare la seguente repository di progetto
 ```
git clone https://github.com/
```
- Spostarsi all'interno della cartella del progetto scaricata
- Creare un file ".env" all'interno della directory di progetto con la seguente struttura:
 ```
SECRET_KEY=chiaveprogettoaste
...



```
- Avviare il terminale direttamente nella directory clonata

- Avviare il sistema tramite Docker con i seguenti comandi:
 ```
 docker compose build
 docker compose up
 ```
 - AL termine dell'esecuzione, il sistema risulta accessibile e avviato sulla porta 8080 del proprio localhost.

## Test
Per effettuare i test del progetto è necessario scaricare il file [Test-Collection-...-.json](https://github.com/) e importarlo all'interno del programma [Postman](https://www.postman.com).

I token JWT utilizzati per i test sono stati generati utilizzando  [JWT.IO](https://jwt.io/) con la chiave _projectsecretkey_.


## Strumenti Utilizzati 

* [Visual Studio Code](https://code.visualstudio.com/)
* [Docker](https://docs.docker.com/)
* [Postman](https://www.postman.com/)

## Librerie/Framework

* [Node.JS](https://nodejs.org/en/)
* [MySQL]()
* [Express](http://expressjs.com/) 
* [Sequelize](https://sequelize.org/) 
* [Crypto]()
* [Socket.io]()

## Autori

 - [Di Rado Simone ](https://github.com/)
 - [Marconi Sciarroni Monica](https://github.com/)
