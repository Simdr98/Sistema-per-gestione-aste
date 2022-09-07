
CREATE DATABASE IF NOT EXISTS aste;

USE aste;

DROP TABLE IF EXISTS asta;
CREATE TABLE asta (
   idAsta int(11) NOT NULL,
   idUtente_creator varchar(50) NOT NULL,
   titolo_asta varchar(50) NOT NULL,
   tipo_asta varchar(50) NOT NULL,
   min_partecipanti int(11) NOT NULL,
   max_partecipanti int(11) NOT NULL,
   quota_iscrizione int(11) NOT NULL,
   min_prezzo_puntata int(11) NOT NULL,
   min_rialzo int(11) NOT NULL,
   durata_asta int(11) NOT NULL,
   stato varchar(30) DEFAULT NULL,
   idUtente_vincitore varchar(50) DEFAULT NULL,
   tot_prezzo_aggiudicato int(11) DEFAULT 0,
   idChiave int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS chiavi;
CREATE TABLE chiavi (
   idChiave int(11) NOT NULL,
   chiavePrivata int(11) NOT NULL,
   chiavePubblica int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS offerta;
CREATE TABLE offerta (
   idOfferta int(11) NOT NULL,
   quota int(11) NOT NULL,
   idUtente varchar(50) NOT NULL,
   idAsta int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS partecipazione;
CREATE TABLE partecipazione  (
   idPartecipazione bigint(20) UNSIGNED NOT NULL,
   idAsta int(11) NOT NULL,
   idUtente varchar(50) NOT NULL,
   costo_partecipazione int(11) NOT NULL,
   vincita boolean NOT NULL,
   contatore_rilanci int(11) NOT NULL,
   timestamp_iscrizione timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS utente;
CREATE TABLE utente (
   idUtente varchar(50) NOT NULL,
   credito_token int(11) NOT NULL,
   ruolo varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE  asta 
  ADD PRIMARY KEY ( idAsta ),
  ADD KEY  asta_ibfk_1  ( idChiave );

ALTER TABLE  chiavi 
  ADD PRIMARY KEY ( idChiave );

ALTER TABLE  offerta 
  ADD PRIMARY KEY ( idOfferta );

ALTER TABLE  partecipazione 
  ADD PRIMARY KEY ( idPartecipazione );

ALTER TABLE  utente 
  ADD PRIMARY KEY ( idUtente );

INSERT INTO utente (idUtente, credito_token, ruolo) 
  VALUES 
  ('adriano_mancini', 3000, 'bid_partecipant'), 
  ('luca_ms', 500, 'bid_participant'),
  ('bene_dr', 2500, 'bid_participant'),
  ('hermes_', 100, 'bid_participant'),
  ('danidani', 2000, 'bid_participant'),
  ('simi_dr98', 1000, 'bid_creator'),
  ('monica_ms', 1000, 'bid_creator'),
  ('admin', 0, 'admin');

INSERT INTO asta (idAsta, 
                  idUtente_creator, 
                  titolo_asta, 
                  tipo_asta, 
                  min_partecipanti, 
                  max_partecipanti, 
                  quota_iscrizione, 
                  min_prezzo_puntata, 
                  min_rialzo, 
                  durata_asta, 
                  stato, 
                  idUtente_vincitore, 
                  tot_prezzo_aggiudicato) 
  VALUES 
  (2, 'simi_dr98', 'computer', 'English Auction', 1, 5, 7, 10, 1, 4420, 'terminata', 'bene_dr', 50),
  (3, 'monica_ms', 'lampada', 'English Auction', 3, 1, 5, 5, 1, 300, 'terminata', 'luca_ms', 30),
  (4, 'simi_dr98', 'iPhone', 'First Price Sealed Bid Auction', 3, 10, 11, 10, 1, 5000, 'in esecuzione', null, 0),
  (5, 'monica_ms', 'poltrona', 'First Price Sealed Bid Auction', 1, 10, 15, 20, 1, 7000, 'in esecuzione', null, 0),
  (6, 'simi_dr98', 'scaffale', 'Second Price Sealed Bid Auction', 2, 13, 10, 15, 1, 4000, 'non ancora aperta', null, 0),
  (7, 'monica_ms', 'sedia', 'Second Price Sealed Bid Auction', 3, 10, 7, 5, 1, 1000, 'non ancora aperta', null, 0);

INSERT INTO offerta (idOfferta, quota, idUtente, idAsta)
  VALUES
    (22, 50, 'bene_dr', 2),
    (21, 30, 'danidani', 2),
    (32, 30, 'luca_ms', 3),
    (31, 20, 'hermes_', 3),
    (41, 15, 'luca_ms', 4),
    (42, 20, 'danidani', 4),
    (51, 30, 'hermes_', 5),
    (52, 35, 'luca_ms', 5);

INSERT INTO partecipazione (idPartecipazione, idAsta, idUtente, costo_partecipazione, vincita, contatore_rilanci)
  VALUES 
    (2, 2, 'bene_dr', 7, true, 2),
    (3, 3, 'luca_ms', 5, true, 2),
    (21, 2, 'danidani', 7, false, 3),
    (31, 3, 'hermes_', 5, false, 1),
    (41, 4, 'luca_ms', 5, false, 2),
    (42, 4, 'danidani', 5, false, 2),
    (51, 5, 'hermes_', 5, false, 1),
    (52, 5, 'luca_ms', 5, false, 1);