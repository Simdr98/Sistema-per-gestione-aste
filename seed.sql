--
-- Database: `aste`
--

CREATE DATABASE aste;

DROP TABLE IF EXISTS `asta`;
DROP TABLE IF EXISTS `chiavi`;
DROP TABLE IF EXISTS `utente`;
DROP TABLE IF EXISTS `offerta`;
DROP TABLE IF EXISTS `partecipazione`;

--
-- Struttura della tabella `asta`
--

CREATE TABLE `asta` (
  `idAsta` int(11) NOT NULL,
  `username_creator` varchar(50) NOT NULL,
  `titolo_asta` varchar(50) NOT NULL,
  `tipo_asta` varchar(50) NOT NULL,
  `min_partecipanti` int(11) NOT NULL,
  `max_partecipanti` int(11) NOT NULL,
  `quota_iscrizione` int(11) NOT NULL,
  `min_prezzo_puntata` int(11) NOT NULL,
  `min_rialzo` int(11) NOT NULL,
  `durata_asta` int(11) NOT NULL,
  `stato` varchar(10) NOT NULL,
  `idUtente_vincitore` varchar(50) DEFAULT NULL,
  `tot_prezzo_aggiudicato` int(11) DEFAULT 0,
  `idChiave` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struttura della tabella `chiavi`
--

CREATE TABLE `chiavi` (
  `idChiave` int(11) NOT NULL,
  `chiavePrivata` int(11) NOT NULL,
  `chiavePubblica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struttura della tabella `offerta`
--

CREATE TABLE `offerta` (
  `idOfferta` int(11) NOT NULL,
  `quota` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `idAsta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struttura della tabella `partecipazione`
--

CREATE TABLE `partecipazione` (
  `idPartecipazione` bigint(20) UNSIGNED NOT NULL,
  `idAsta` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `costo_partecipazione` int(11) NOT NULL,
  `vincita` tinyint(1) NOT NULL,
  `contatore_rilanci` int(11) NOT NULL,
  `timestamp_iscrizione` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `idUtente` int(11) NOT NULL,
  `credito_token` int(11) NOT NULL,
  `ruolo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle `asta`
--
ALTER TABLE `asta`
  ADD PRIMARY KEY (`idAsta`),
  ADD KEY `asta_ibfk_1` (`idChiave`);

--
-- Indici per le tabelle `chiavi`
--
ALTER TABLE `chiavi`
  ADD PRIMARY KEY (`idChiave`);

--
-- Indici per le tabelle `offerta`
--
ALTER TABLE `offerta`
  ADD PRIMARY KEY (`idOfferta`),
  ADD KEY `offerta_fk_2` (`idAsta`),
  ADD KEY `offerta_fk_1` (`idUtente`);

--
-- Indici per le tabelle `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD PRIMARY KEY (`idPartecipazione`),
  ADD KEY `part_fk_1` (`idUtente`),
  ADD KEY `part_fk_e` (`idAsta`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`idUtente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `partecipazione`
--
ALTER TABLE `partecipazione`
  MODIFY `idPartecipazione` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `asta`
--
ALTER TABLE `asta`
  ADD CONSTRAINT `asta_ibfk_1` FOREIGN KEY (`idChiave`) REFERENCES `chiavi` (`idChiave`);

--
-- Limiti per la tabella `offerta`
--
ALTER TABLE `offerta`
  ADD CONSTRAINT `offerta_fk_1` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`idUtente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `offerta_fk_2` FOREIGN KEY (`idAsta`) REFERENCES `asta` (`idAsta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD CONSTRAINT `part_fk_1` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`idUtente`),
  ADD CONSTRAINT `part_fk_e` FOREIGN KEY (`idAsta`) REFERENCES `asta` (`idAsta`);
COMMIT;