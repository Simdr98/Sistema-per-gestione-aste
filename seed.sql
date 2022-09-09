
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
   chiavePrivata varchar(1000) NOT NULL,
   chiavePubblica varchar(1000) NOT NULL
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
   timestamp_iscrizione timestamp NOT NULL DEFAULT current_timestamp()
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
  ('adriano_mancini', 3000, 'bid_participant'), 
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
                  tot_prezzo_aggiudicato,
                  idChiave) 
  VALUES 
  (2, 'simi_dr98', 'computer', 'English Auction', 1, 5, 7, 10, 1, 4420, 'terminata', 'bene_dr', 50, null),
  (3, 'monica_ms', 'lampada', 'English Auction', 3, 1, 5, 5, 1, 300, 'terminata', 'luca_ms', 30, null),
  (4, 'simi_dr98', 'iPhone', 'First Price Sealed Bid Auction', 3, 10, 11, 10, 1, 5000, 'in esecuzione', null, 0, 123),
  (5, 'monica_ms', 'poltrona', 'First Price Sealed Bid Auction', 1, 10, 15, 20, 1, 7000, 'in esecuzione', null, 0, null),
  (6, 'simi_dr98', 'scaffale', 'Second Price Sealed Bid Auction', 2, 13, 10, 15, 1, 4000, 'non ancora aperta', null, 0, null),
  (7, 'monica_ms', 'sedia', 'Second Price Sealed Bid Auction', 3, 10, 7, 5, 1, 1000, 'non ancora aperta', null, 0, null);

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

INSERT INTO chiavi (idChiave, chiavePrivata, chiavePubblica)
  VALUES
    (1,
    '-----BEGIN RSA PRIVATE KEY-----
    MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJuvyi3VlM671SFYdvx41FmuJuWUKAoK98W/blEtSuw6hNJaM8MfiKye9AjUsPV82QU1oW/urgfxKpj98gErnVlP2ErncvaNZIA7dSJss7w/tZeL+aEERO16tn9vabcMmlE0xx85I3BbjBTtnnJ2lVOAElNvo48IYhgv8KHiGrtrAgMBAAECgYEAgqtyyDGBalrgsdIsXA+WO4ceAobtbDB0cbcQgnW/crJTFLK8y0LGVgw7ysWpmQGmrOasjuQHkYbrN+m8mxrePu7SzKZVWIYYC2DTwnsWAfhTVCzN31CKw2IP+zI/eJD+eMWnYy9xdMBIPuo/YIWjPZoJMT33AyVv6go+YrfpKjECQQDIVDgCBuubSeU++KgVEQFV8Jr0VvLIulI8QzhmX7PTY//z1aEVFtu8lwebKcOUdqPYp04BYk8d5DxjCykHyinHAkEAxvOiMFCZO0gIAfkDjHmvl85K3QIiZTtgXdSuPf+7kVhzgb7TMbN7lVsgzTWW5EMHRjXKrDexxTByHaH0xRMBPQJAJ2RgKw3fUIbkXFCbBKF2aMbKQZfDX/M7bnwtX/wbqUq1ruXoKfR3uwrbxQgeXFhD+btUXHNPaWpS8YrlQ5HeSwJBALJn7awnypEHce7a71y8DkMyQZ3YeSGQUkUyICIGvpuC1umlRlvOWGdBtbNvd+UvWkmSmTFALFDotZxvDEDhXv0CQC8unoacPoyLv1BwOrOSJv5QpUR05oHjbznUDqoW3rjZCN3wKBA+OpKJmdDwCDFeiy6OWvdD4M+8ZXgJ5y8UdmM=
    -----END RSA PRIVATE KEY-----',
    '-----BEGIN RSA PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbr8ot1ZTOu9UhWHb8eNRZribllCgKCvfFv25RLUrsOoTSWjPDH4isnvQI1LD1fNkFNaFv7q4H8SqY/fIBK51ZT9hK53L2jWSAO3UibLO8P7WXi/mhBETterZ/b2m3DJpRNMcfOSNwW4wU7Z5ydpVTgBJTb6OPCGIYL/Ch4hq7awIDAQAB
    -----END RSA PUBLIC KEY-----'
    ),
    (2,
    '-----BEGIN RSA PRIVATE KEY-----
    MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIIBao76ilKgVDJz2zW/hozLrDmeMENIQliD5mjDLukI5v2phIALoDaS1COLGr3yO+U3iD1dAn5QWCXvKq5fOkC8t9iAX+RaKElEx4w+ook/MpzP/O4l/MAiZJFojWQW9YiYW1Ylr+pgs7LNM5cq8wtQxq0mofOuOSe3pDjVaeqbAgMBAAECgYAsYRdjH5vAgQK9Ble6jVr9DToJoTqQfUZIuR4afSayXlucFBYrL8zNVGoeiAnk9aAEq2RSrkF/pSWyLWbAh7l2it/WdN1rwn4O4ZYfPIH7MWnfGYzGYfv27ETK9xM57f1zXHST+WfOflh3hWXHvVGhsmAhlb8HZJYClZFWuhWj4QJBAMgWJqKU6BbSHjzqVNDNn/nwdrBdS2KE2mPnVEe1L6JHccQWiwU36f3KKzlFX8IS9CtYZQiI29kz10CeKgRq36UCQQCmVcpYmWhgVb2MosHEJI6ap+Shkf8lBr1qr1JSb49MXMiVeI5dh8s4leI62CQ94VZnABwzgxY8CU5RiaXHA40/AkA7OctP3rHgZ2vJ7jcS43rSGeqYA9WXoOmgHs5kt24VI/65405dShK6K8ilmDJjGQcreWvWneQto9m4Z9jaG+R9AkBcTPj3B1HbO1juxJY/kIWtnoMJgWmTE1Vi8Rz+b7eWCVqpTve5QRRtNwcN3kjmKbf3eiEsGI7rC8LxDi/26qqjAkBYWcbqP3EkShoecK6CYxadDBpPbpkd47jObUG3XT+jbHCfYGVHwU4uNFKWgZ4Zithfl+Ps4F355BKHW1+Ntkzm
    -----END RSA PRIVATE KEY-----',
    '-----BEGIN RSA PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCAWqO+opSoFQyc9s1v4aMy6w5njBDSEJYg+Zowy7pCOb9qYSAC6A2ktQjixq98jvlN4g9XQJ+UFgl7yquXzpAvLfYgF/kWihJRMeMPqKJPzKcz/zuJfzAImSRaI1kFvWImFtWJa/qYLOyzTOXKvMLUMatJqHzrjknt6Q41WnqmwIDAQAB
    -----END RSA PUBLIC KEY-----'
    ),
    (3,
    '-----BEGIN RSA PRIVATE KEY-----
    MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJR9kt+TiBZs66XLIelcxVuzsSOqpF9YJZ1xdA5JA4dWwe9eVmotWahy1OvUdQRlXdQHd9aFZW6icggMstREyUD+xk1altqizIbA9xlONNH3MWhWGud/wjP0gBSsIEyeMubm1xobsoP2yeJRFQHZkH9u2fLfUjpUOwUIZZZlx2PxAgMBAAECgYBB+ooITcVqMXuDb37h8ha/aFiNQIVI2CHek0q+DjNDL4l8kq5S/1OXRW7WWtCj42aNj8PvzdYEEqoYaYwMRYQmbnUSaTspO5OucTtEhGYdi1m/U6mCF0GPC2lovhhWZ/+huGHDd3jCorzvuOoJW4mTYUQ5d/5g1DAxPgYdNY2fAQJBANy0AMmmxcyPr/wu701rv3Ui117ragVcC1RY5t/H/XdM8Xtx1bJEdCIyEqf7O2PCFpLxqvcGLhx0sqR0z4PtEKcCQQCsPQ1IzQkaWAns7NNcHtt/Uf0nxqX7Nf9wZSxTXlFmSFWzYe2LOKnAV4IbFvEr7zFYCu3rLpKGZPAVz1eEpCGnAkBXswdlGeobgTVTJmtc/mXT7AZc53r3qj2uRK1pWxTzJRYIEZHzBpSHShJzwbc1ytghh/qBsmj8Ubry8p/LMpadAkAgVsI0xhKMeLU8X+b7Z+vMhwdiPYESnrvcTZK6AH6GFtTIfn2MY1I0A/owvekAV8PLBRpQywjF5RPS9IA5LlwHAkEAmQU+zGG4KcJQInQptD8IT63iVBAfZ0heUcm/zdrciqo5VA3Llv60lW6zZ6uGTpRinnou78B5P/kNKb3fQbBdRw==
    -----END RSA PRIVATE KEY-----',
    '-----BEGIN RSA PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUfZLfk4gWbOulyyHpXMVbs7EjqqRfWCWdcXQOSQOHVsHvXlZqLVmoctTr1HUEZV3UB3fWhWVuonIIDLLURMlA/sZNWpbaosyGwPcZTjTR9zFoVhrnf8Iz9IAUrCBMnjLm5tcaG7KD9sniURUB2ZB/btny31I6VDsFCGWWZcdj8QIDAQAB
    -----END RSA PUBLIC KEY-----'
    ),
    (4,
    '-----BEGIN RSA PRIVATE KEY-----
    MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKOE6yzdpSzi7ljRXuo5ISnVbIAmGHM67YH7kEbUVAT68tgIWhfTTiGBuFH7yLSl01LuWRSn1xTHU6mApuo0pbaYSsP2OnLypCsKYckUEf3+Xo0vV3a8I8Lf4RdqmBKVQ6Kx0VFkGftZNqeycAsVC3+kdxeEmU9hVTrZ14DE9UQNAgMBAAECgYA9qHklSc5mxospYolvuGsQ4zEugS7nBGlaggk9LAMifZ3kaAHQyhTD/a4K++4KcBznQIjGiSNI6oBZgfFujruNLDRlmgOKH2Hyhp1fvDj4y9JpiUlMjHoiO3Eu8grDHLK8+PBcpMxKnL2cYd9z5GJJjMrj4HSt8Lk81hCY60qs4QJBANJL7kAhOShSgqELKQsI0w0JMfYAgWYxshZ4e7o2pJlqH9VP+qe+PTSwBaaii727l66M1sfcaJeFIRJHXLBj0Y8CQQDHDnq7OZY/i2baDI1fN9tqi7/g4gtnR7BDSC3t8FXKOt8lS/4W2Q4wX+s61flK+4+gLTVuf5dBaN00keRPNMqjAkAVGETH7g07vDsaSHJPhw0Uq611TcutIqMImgFfRofwU7LpxOIR3YVqOZX3hyqZV635dms9FSDwwgv1N29WykyFAkBXfvbVqxdu8RCRkejmTMAmki0SZWnLyQgiWuzNZNHg5YXGeCPE2T3SZ6cXIozEt9TG/Hg7DNxohPaOr/4iDrtvAkAIaegPPIHM2GX5eQokrrXa+JVOzVuy/tdlixs2DMk7J0+kt1JJos99i3ImVNKMl93dA/+mAQfBXnNwhsJigbe8
    -----END RSA PRIVATE KEY-----',
    '-----BEGIN RSA PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjhOss3aUs4u5Y0V7qOSEp1WyAJhhzOu2B+5BG1FQE+vLYCFoX004hgbhR+8i0pdNS7lkUp9cUx1OpgKbqNKW2mErD9jpy8qQrCmHJFBH9/l6NL1d2vCPC3+EXapgSlUOisdFRZBn7WTansnALFQt/pHcXhJlPYVU62deAxPVEDQIDAQAB
    -----END RSA PUBLIC KEY-----'
    ),
    (5,
    '-----BEGIN RSA PRIVATE KEY-----
    MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIMbrw5Cni9SF+3Xa8tZXzQvQgkUpo4WYI2VVSxusMmcgKHoHNRdibUJXBlh3CPx5iiFJANCVx7KmcArwHUciMbR96rwN2Tzgyivw/uecNcffIIpyQeD2y/cekzSw4naxOPbxnMgKrpF/CzoxyEc7QWPZ228v5dlp+GBkHtB4MfbAgMBAAECgYB3rd2udsFPEPEm+246wepWCI2PHHqtWV/p3ldRp/lZELObF/a5JGmACHs58EqzxS0D8AVftD8yrF6NPWMBhHqVLEcSTwmLP7hlVQALDxnAm7Grim0BTCWeMG+qEoQy69saJArycNDEA3xc00KCeaHaFbKGLNt1DT2BFxLMgHS3gQJBAOVNCb1xZF19IpPmRzKJUKyaCOP0gLQukPvRc5j3IawN+fKybxneuS/oReZCfaSzrukrWHXLncScpusZ8ryxZl0CQQCSX7t2tgFeNPiQPN/VZGlCIETX5zyNpFw7l/Xnggcp7iQuElhB/KE2qqqfhFcTjugt0JtW1JvcHtFVZvnR7pOXAkBiaEOL2AQ40yFp0+QuXhwPVzQFkMNDkNCMIgG4XidHTeA9NjLUKW/UjZyiC1scujiQvReDxlT5Mjm4oDQ6ou/JAkBWv+gBliK/a5N5IKrj9IuxhiBm+QPZSnTjWM+Dcnu+bQYCTBsEmK4PERzoR224CLUwGfdGgeERly4neE1NDyFnAkEAlZs/fAPIzxeRCN/1dacgQVUzKS/1pYBYkVBUXKVr7sMpqj7jsDUcATHy3+yHqGNCbo9PIx781TEehCnW7bUyJg==
    -----END RSA PRIVATE KEY-----',
    '-----BEGIN RSA PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDG68OQp4vUhft12vLWV80L0IJFKaOFmCNlVUsbrDJnICh6BzUXYm1CVwZYdwj8eYohSQDQlceypnAK8B1HIjG0feq8Ddk84Mor8P7nnDXH3yCKckHg9sv3HpM0sOJ2sTj28ZzICq6Rfws6MchHO0Fj2dtvL+XZafhgZB7QeDH2wIDAQAB
    -----END RSA PUBLIC KEY-----'
    );