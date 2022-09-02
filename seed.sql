CREATE DATABASE aste;

DROP TABLE IF EXISTS `asta`;
DROP TABLE IF EXISTS `chiavi`;
DROP TABLE IF EXISTS `utente`;
DROP TABLE IF EXISTS `offerta`;
DROP TABLE IF EXISTS `partecipazione`;

CREATE TABLE asta(
  idAsta PRIMARY KEY,
  username_creator varchar(50) NOT NULL, 
  titolo_asta varchar(50) NOT NULL,
  tipo_asta varchar(50) NOT NULL,
  min_partecipanti INT NOT NULL,
  max_partecipanti INT NOT NULL,
  quota_iscrizione INT NOT NULL,
  min_prezzo_puntata INT NOT NULL, 	--(base d asta)
  min_rialzo INT NOT NULL,
  durata_asta INT NOT NULL,
  stato varchar(10) NOT NULL,

  idUtente_vincitore varchar(50) DEFAULT NULL,
  tot_prezzo_aggiudicato INT DEFAULT 0,

  idChiave FOREIGN KEY REFERENCES chiavi(idChiave)
);

CREATE TABLE chiavi(
  idChiave PRIMARY KEY,
  chiavePrivata INT NOT NULL,
  chiavePubblica INT NOT NULL 
);

CREATE TABLE offerta(
  idOfferta PRIMARY KEY,
  quota INT NOT NULL,
  idUtente FOREIGN KEY REFERENCES utente(idUtente),
  idAsta FOREIGN KEY REFERENCES asta(idAsta)
);

CREATE TABLE utente(
  idUtente varchar(50) NOT NULL,
  credito_token INT NOT NULL,
  ruolo varchar(50) NOT NULL
);

CREATE TABLE partecipazione (
  idPartecipazione SERIAL PRIMARY KEY,
  idAsta INT NOT NULL,
  idUtente varchar(50) NOT NULL,
  costo_partecipazione INT NOT NULL,
  vincita BOOLEAN NOT NULL,
  --contatore_rilanci INT NOT NULL,
  timestamp_iscrizionetimestamp NOT NULL
);