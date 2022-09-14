
CREATE DATABASE IF NOT EXISTS aste;

USE aste;

DROP TABLE IF EXISTS asta;
CREATE TABLE asta (
   idAsta int(11) NOT NULL,
   idUtente_creator varchar(50) NOT NULL,
   titolo_asta varchar(50) NOT NULL,
   tipo_asta varchar(50) NOT NULL,
   num_partecipanti int(11) DEFAULT 0,
   min_partecipanti int(11) NOT NULL,
   max_partecipanti int(11) NOT NULL,
   quota_iscrizione int(11) NOT NULL,
   min_prezzo_puntata int(11) NOT NULL,
   min_rialzo int(11) NOT NULL,
   durata_asta int(11) NOT NULL,
   stato varchar(30) DEFAULT NULL,
   idUtente_vincitore varchar(50) DEFAULT NULL,
   tot_prezzo_aggiudicato int(11) DEFAULT 0,
   idChiave int(11) DEFAULT NULL,
   room varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS chiavi;
CREATE TABLE chiavi (
   idChiave int(11) NOT NULL,
   chiavePrivata varchar(2000) NOT NULL,
   chiavePubblica varchar(2000) NOT NULL
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
   idPartecipazione int(11) NOT NULL,
   idAsta int(11) NOT NULL,
   idUtente varchar(50) NOT NULL,
   costo_partecipazione int(11) NOT NULL,
   vincita boolean NOT NULL,
   contatore_rilanci int(11) NOT NULL,
   data_iscrizione timestamp NOT NULL DEFAULT current_timestamp(),
   socket_id varchar(20) DEFAULT NULL
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
  (4, 'simi_dr98', 'iPhone', 'First Price Sealed Bid Auction', 3, 10, 11, 10, 1, 5000, 'in esecuzione', null, 0, 4),
  (5, 'monica_ms', 'poltrona', 'First Price Sealed Bid Auction', 1, 10, 15, 20, 1, 7000, 'in esecuzione', null, 0, 5),
  (6, 'simi_dr98', 'iPhone', 'First Price Sealed Bid Auction', 3, 10, 11, 10, 1, 5000, 'in esecuzione', null, 0, 2),
  (7, 'monica_ms', 'poltrona', 'First Price Sealed Bid Auction', 1, 10, 15, 20, 1, 7000, 'in esecuzione', null, 0, 3),
  (8, 'simi_dr98', 'scaffale', 'Second Price Sealed Bid Auction', 2, 13, 10, 15, 1, 4000, 'non ancora aperta', null, 0, null),
  (9, 'monica_ms', 'sedia', 'Second Price Sealed Bid Auction', 3, 10, 7, 5, 1, 1000, 'non ancora aperta', null, 0, null);

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
    (1, 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIMx4Z0uVkNawCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAeQ8meaIQWAc+v/RM8L22pBIIE
0LV1GbaXIIeaAiEdARl6VFW4Z5qs1XrMoc4dGtYCd4FE/nCoxuqf32gk1gcvp1jZ
JJdO+k4WDh7ZkP31rKnkW/9n+/1nL6BScoZOkMnrKtmkdaUjiZxHv/5fpSlxAygI
IF+Davl8ctLn0HcnX7QNklcgtQ08yAqgMMGzNhqcjQgZ9tNDzux3LRw4anP5wDXZ
cc1G+VtSohL6PT+9HdSxrGQlYVkTAHBCAdwRDgakBwnLGOYRiIsJpuvqxDwsznS7
5Nn5uaoXFFHXIlyXl8Pw6+Sl8WG/W6KHCLP9Y6CH9iD6WkNIPsUQ9OluZeIuoAWH
irL5j+OQXNh9PFz/JobhSV1IKidRaTqpGscNMyCyDIjZbe6WmRlKMiimBoNbWb+w
gG5+EM7Zj9mtvVjdATHG039pZAprgsmzTHECbztR4qtIzZfO/Tu8v9U4NkVr3vhn
/WqmmFIIEV7pknHuSaWrRpJSOfCHPyxeOrSOfIM6jREez34RsrWbmJZhRVoypCXS
UmVEh68UjipCOGXb1uxIZrBIVomevd0Zx2wNWRsPxU81LzoHIh2xCGcHUkJ+2NsF
I2Dd+orQ/kH0qHKikfx6wF9HyU5D9cGofl7J4OkpUl2S2HhhoSwhe3ME+5ZchaTw
xffGZ+QVSJI2NA5A0yIMSYkQ8Hdcwak2CP3MCegj/kzPsVL+/k1TvUMC3Yq1Xdyi
uRLmOTqYUPvJFmXYroehaBnlT8WYvPAeAdFX3vTebZeLrC+ghfcpODp9nyxVKxV9
cgQzwIpSHS/GSzzGhgIyzy8UnaOjxYUlrPWE8/l+guqptJwcGRINvtLGopCNjGTn
rF6eYaBZun2UiwwXxUc+NdFldYM2LsIr3BuLCCq2pN29ETWsy6FjjwLGcggKk8Eg
u923qjrnFt4jTxePjmAk64BWm/NgS1jGGpQQyFiw5d0/ZvmCpd83gRJ3qQPkbQm/
cD/1rpPg86CmCR7vv2t4Xn5VhSD0j06I4O8YSqTyPABi6KgkvCr29lv1PZWZvoLA
v7/uvE0gW7eEY6PWOSB5rGRivaMOkmoRRrtJe3ZBgqtIPnMKL4F8TgKb14ErJaO8
jUrBIMZ9UHXq7z8GFrcCPRaCSI/fRIQW7vD3qe+eUnjQRr/z3NjCIoWRstKTkA6Y
5jBiuiEbISfWQnfzpL7qL4qdMGP7Jlq1RV5PwT6k6Z2/LIC35BKnViWilS/yi51f
Vu4XLA6rhKpLcfQPcT2pui94WJ3J9XkI3zhPal5Fi5fVmhBSgRR7jRm86D+tUeZN
PNqL4ekGGko0iyguv/D8MSkgz/xJj+cED9sw1lHdfy7e+QI+hTZrEL++wn97jl0g
XTpGTG7FGGSQVbIz+t/t1cFSnSHUsvpEiapUreiwGerrZ/uZB6OJOyNC0tTyrqr2
ssPSfVJGuJ1WspkHzflIEotmyVo7KxdRRzmmtFYqVsRTpiaHey+W3vWW5pJbmTsL
+7e4bAkLKKqA4iIDEy9bqWQ4SjPbfdNmSSEoMrenb2W2wGFH0dEA7NJYK3SvJoM/
Rs0uoUA7JqSPwjQ+OZKPFxFdLjakBy3DrTR2UcR8BbAlh230Haoi/m+ug0ikmSnm
4dE3i6XHXTes8wOTdC0Ry7rJlFs5GAga3afps/sEf+5P', '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAyONLdo2jNrNyFHhvw6rLlGKOQdCmCA4RLw8jBearAB9/K0qJKw39
OJ6xk6GizvfyPYRq/+bhLpG1pd4OvOV0XLz0QtZL3jSjHZjFvheNokTPfe3kVYI1
kTwX7ho1Y3tevI/xg2j+gmsxsn641T7JWRvHXUGAwPXTp5mMTM0nbH2ND8h99FvN
o6++sJRlokBKB1TNzgf8I/xcttc2ZNwT+T+rT8kUiYpQej+3egF7J2EfaYjoXTqt
WK9zYWkTJk1vIF/2nrDpGeGEoXRpDNodEZ3B6cK8GMn/vFiUmtBBzbV7k/tEhlrF
RCyaNextAmINH0wOjZYEdUP/DBRluMSVnQIDAQAB
-----END RSA PUBLIC KEY-----'),
    (2, 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIwxqzO+1llkwCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBB0VFIGpDs9qLJMQqMN7FL+BIIE
0EcoSCzpJtWpa/N+Vi25vMABo6ypaGvCpWVhKKLCq2WrltIAQJfIg8lP636C5idG
5cuuXELHW8umMxHriNeowbgnmYLblQu2LNm38F6ZvfQl4VAHY8i87c9VmbS+xW34
jGrhpoPm3zMVXZmOEy8B3c9+tBltf68D9YDAp8ZgmUlOAu67LB+PxW3dtULPXI6S
gOKv+GD+YR1dwF0LoAa6bDWyiEIpBu46iPsVuLONdctwhx3WXKUyE/u7dUI9pQWU
EU1janepB7yyH5hSCjJ/YLRfBkIXxX7cESnz3tYl5pNvBBQIzyJD3UasPh80suBP
+VGwW0mPQevliLJ6qislHbmeRpBiBIfGEdqeJpPmgOgIPfqj5seFH6COSwCJcqi0
9hXmrkCTPFlYnO5ehiwf8f5SGK+2oKHsfRKC/s3fucaiAxab1SULrtJ5RU8xTYf6
7KKva+u20eUOL6bNTUPIArWBtS7F7bkoxJcJc1VsskrJP4YBUor/2pkeLORvmahL
XWJ6nc+HQSbpvBXAuAlLwMgq/Q4tmLOlW0TWCDq4WJz1SgH8MJ17pi4hS23H5jsl
l5uWSdVIIu+0Yyp0E8B1goGLu27ga3lNQuJFbbaYmlDrlMGZ0NaDw4gWswaUHB7G
yHu8fRj4CWK4FfSNtcY0GIbJCEOFpA0FS5c31mgJ75zDzjyK8iZGezSIfQklhNsM
MjA5Vq2jWxsJBnrphRrq/3SpF17E0lengw7FEUn1lN0jm9H2HKt2iRk4aa54lth1
9xuHY6gtPmeAiePif9ZxfqfVugJ0vEDJYRPZ1wcYVMLOzbx4aQsNrNP2e7tARrIO
YVJiqEDANenxx9CmRXJEmmdEGpeAyj8/NFHCIRwJj/DuXax46nCFTdJ5/3tTFUX4
I6bvWK/8HCTz8ECGxfZvsAc16K6cS/6sUpYGkWYbd874qe+aBoQbP8l2mKYQUO7y
MYfsL+QNpyypmh77+GExZfdBYdttOLezMtdIWM/pjuowkUNv4zcarzQPGPR6EHfY
6PrmIq393B+9Y2qvIwbeIrPq92YWhItmOMMl3zsmKb5ATBkT9LPqHajU5c+2Iw5B
JVENCLrnxjAGSVHycI+jHfp247Ulx1zZOpi40ghiLTL/wEgbtC8HKWS3jTkHP5Ch
lH65whNAIgxwGFPEZHrxZ4+ilZYFW7fd3p2nENaCfnl8tt608ezU5ZrHIV6k3b4S
pOyOEa/4dc29qzZVm4XmWRUfOxSysUnZYVoCZggz2Q2oY/g02qse23RTc31thl1U
vYjJlMxiP6tKKj/tuHyLHDQuWml76CohbpyhHljFzxGbVvdCVjNKjPHAPUi6X5Nk
maJHZAHOSgmSg+Ga1ZnYZmiV/1+9XGz5IinDCRq+G7o1obR6UJ8GKW9V8aFEXPsB
KtM2iUjJp0zypTDSC2nHRkjsGxme+4tNPSQdReG0AatAxMc0f+5vsznxlkWU6PJe
hCmgwTakY2G6bivmzYZw9z+lqMBVsySbEGEf9ZlXcZzDIxinefN2xDgIa0yJiw6P
EuTr588odLZ0l5F6Ou15H9g5jUHdTVNE0bLq0HJcSGMrYBIq36I8CEDZsoacolAb
jj+Spam/M2QBXR7J+TtScH4rbbvQ5lQv0zd/PRm6VHk5', '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAq8+2/k9ACvvgAQ8VUFNwJfrH1KpDY4N7coInNzeI5ktDSLOM+fJR
jhyeNwNPImULWng2bY7mPqkvUesJ8HkqjLyVFzrvmtheD/7AhY2R8BhJOh/hZ1De
IvFl6Tdu25mpV2+lGngCftD2lJMos/WNeYl1fwPTxdsnEEqErel90sq9DrSui2rR
1iZFxh16D8z7Lfe4t14xE2BVbs78kofzOH+rRjsc+6qCNhUTz3TtkqU1nNLGX5dF
Hm4cYQl41+jplqcg8IEhK7LtxJltj86kvuvByOaqiTkIu+Qg/lLCO2AemCECnQva
taxzRfCNDxUg5OFIMywCKR4lkv1gw21xRQIDAQAB
-----END RSA PUBLIC KEY-----'),
    (3, 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQISt6xflxJKcQCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBBzpegcuJv1/elfhKAuEJu6BIIE
0LkHI6nVM6TpkYPfcbyOtdHO9mutXJ8PoIErNFyvWkjOut9ONmX93wXVzkjpgZE9
fonf1x6TQr3REVzlC9v0C69J7BGhUeL9CEtFJ+Qhw/g5aaOvZ4eDxVt1/W0W0NLF
xuWV/awGG8nlWI4gGI9X182f/T49j+VkSkmU11Xvalj30bUitCIOu32wM/F886GI
0QGuiEymycZRWfoHi8ev8K9S47A+zHxm1WjwVJMTY8QaPxIq6mCNw0WBxNGPFAeZ
lu0rbRYt7eaP44PVtAhHAwfbNPdezff9/n8xvmm/1KAB/cihOWkBUTY1eDdE//At
+Mq/v5guU2siwNmrY7fhL/j8jN/00XhCwyZ/6sXEIG3XjyoIXRU/aavgclwYkH6R
bC3dElR4Chr2UovJVlLwGCcM8JMKaRvkgOEWORl6d1XR7J1n8ogolaX0ZefKdWP3
YRkQ8QzGCzxTcv1Xy9MFZSpDGwZnwyjXRNEJ6zlHkwARk3C3mqyK75YW9sF6sKSP
7DBrc42XIHTsvQvLQcoI9ygy25Tek0S5PVIS3qYuY7jQPFT9rYOvep78gfYlXAVC
Wq4UUB7gL2UJfSoPYRDD/M63gUdQNKncaxG2Ebjmpvm/mVeIp/C16aqQdHltNVA4
olY38v6rkrnd9AqJyEgcKSN+LZQHpx7d6u/eJINrSDpyixu9ns6prRawCWMxE8r2
cdDzv/oZdLY1qYqmEdpBVCkKdS4ZrUnT+W5+htm3u+6d9kZSMfBqRQr+XMSu0VdG
W2E1DTsVKp/Or+RFdAXX+fz9Dl8IykYP5RwNW5UV3qYmrtAIQDAJd2OBfk/e6XAB
lP6MMlCTHdvzlZC3sQlExhz4T4FIig02V0APBfqYXhIKy3C1VB7OtJZGYYeGON/D
EfIP2slk3Q7fpy6zXPJXylJwNEhb38LYYfR+xUZ7Y62wo0t3yKJrr2gnPpclnsC/
wUkGk0Q6T6Q0IcPNNtPTrNkIV7jyUrRaXr0Aub9OTff3rVbjIomJWc9kWZ9C7wJc
X1nSDuzEsE4HQ8J3RPCyiansvlLUqUnQOK4bHYfRPm8xKYb/ZEmSG+2hx6JPsQkj
klyDCqZz2EFNBEyuKbbtxQLawiIdOf7Gu3OHNOi/Q/0VFjMKnFl0/Fo0NdDKVmtn
5SheMybDLt9nmjHZvXoScCqg5uRmgRLtcV2O3xHsnkEBp0XM6qWPDVCMaF0Vripo
yQ+HDa/Sf+7lKumSS7KQXuIxv89mapOzUVl/b4X9nWrTclmJ/UOirTlOICaNYZ8p
gU1mT5jVF24i6Ib4RbrBXFHtqL9oMxFhX+Zp4ZpkSgC1QynmyEhMEPJ0LnZgJQYm
nLxqToW047M47TTtWMAYVRoAsrBJumyeTvIFK7WqPMy3L3vMg/2IizTxR4mWaWTH
L62L35F6hrVMT65pk6uGyzJNglmHm2XAi6A5933d0fwxRkzTC68eIvCth4+Le55v
qx6aqjSJzyk8GS90I8lmpexW/Xikmt/LHzrhALXgKufagP3PJu+dFfEhTS9JatVb
6xITani3zFsb263c66R+3TRxlzQrkMfAJOh6ooLEgSOuzp/rQ9P7SzHfz9Rtz6jT
EKYzYHk995HoCqIurmfatry+ThzeI10Tjhk5F4c2jmYB', '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAtMsXkllEXYjwnyEbhsuGhpAludm9rlmpmASikn7T9WA4RLaw27hI
5rE4cezCPNapEFpZXuZwBUh17K17/2q4Lyxgq02vtAAWTW1MaNWjZolBcxp72fDJ
LHVHmAunWQX7PmU6qJ+9c/5JLyFLLcsMY93gtgWSUeKLNdkugaxF8U65diOvmzf3
D4J5nVig4jnnu3TrAxA1Iv5BRt2QQRdbodqP7ZmZR6BIDWWzTSICBuJWmZnXgx3S
FkmCH56ppabRq5+t6JJ+kFtR6T0+YdYJg0HFOg3x3pa5IKh9D+S1GI9fZtTCheSF
IXP/yprJb4tHZtwRzFx7VfRYYwKcsle03wIDAQAB
-----END RSA PUBLIC KEY-----'), 
    (4, 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIAIAlSIMLsZYCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCACbp8S1iF38yB60Hu54C2BIIE
0A1ypC/JcncmJnRtTuRKg8hCohOXSVCJSbwt6NQjRiev0YJf6koMKSLjGC+PkK0A
eymzBJ921LVlKVEWzDACt+r5GsTy94Y7oQMt8AYkAi0CHWi1NtJb95TkS6CITtee
b+PKS/Uh4VfdxX/C7QG4rq7pxagXO5qZQ6fY6cP3TDzOnVwZi+9TvFDIAe38g9qv
CmaieN4TmbRk8vCApMF16ltanPg2Ung4Ugvf8+UPUQrnhmF4FigwExki3dJfB734
cJMXuSQxwP89ShENTTwQUPXEmhiZK8q/YO8F4lPAdIexHa8jw7oPtnJwWnvh3oYv
h1YAehjFIcHTTRkoaLYoAMUvnvDBQ4TX55vosyN9frvBpdYPaGxy9c006iML/nwZ
FYDzRYZPZFycd0I+l6tGX54KF3mLiCyoNdNgh9EtqwhPkK9lsyuSPIcxCEZPX+ZR
CLtIp0CoXAw2oaO2oPd9UhdbAcXEaJbIwYsDJyo9GRrCjVvhA5fEtzvpg1Q+tnwq
ExZDAtMADeJ45ceJRT9xUOnjDsyPa2WLAxcYNto9OT4RxlwThlcDW8byrjrdbuct
L+4ZtD0f+SMm1Ng0vnG+61grt89MYT69zgBWKhl3Umf8hx7/CpHHRg8R1LTl/lhJ
hHosV94nz3fSE1gIajPG20R5JvotgXRaVuvQQ4VPg8hXO8DNZXShnCxsBVa6WLUB
vtRaR7ECIGgT7DGnDv7MKqjVopfk3Y3I7l0Q75gPrLI7fCUUwCmZ9kEXgF4GqGit
UV2qbRh7uHoxxtl2iZJdeiDXPm3w7KokpiEhHGMdsu71MwNyYQCV7bJcKl1j8TtD
jFQPUX4hXEVS73gXeWLr9DS5XMfZef4Cz2erf1CjWei3jyNHdBqQpKYCiUcxMmsR
0+BK5fOykHTqU3L4bZdZkSN79BOSQ3moEvLlA2syQ3jpfZFJ1fIxOug2TfROWmWI
9m0w9s7T3DMRrZpztu7NjYajA0gPGNeJujIrOO25O3KfrDZatHXXUDYHLWv5Zwb9
9iMS2bEzuiMYtbC0FMR0qucGvh9zErnLYzM9rWmVkFkXfr6xgGN8ILmgMuRS/Jvc
hKwLP34tltYlfiGqNSqQA8iuEyEZaksn5S1mlDc9/NPwC1vrWXp4eWXH2f+ixj+R
KsF1qkjLqZ937nlgZrmyDOlVYgU0MteIIqwKBDCiARegkm1rMvLDBJ0sBlOXTkdA
XfzDV2xkdgS1nWFi1Z5vKVIpFrtz2MoHPc4LYi5Glmi5BwVwgj84Hk4JuwcIHSZ4
344kPGexnVfkG9pNvG3GtzOt3zV4p/mFI0Fng5RgcquBZlKviUm0mcbt822zEUr3
C6U1kmqbE/4eFg5D+mXODki/w7HVGUItoH0+YsEgVzAyAQqIGFZKNbIYVlIfVYfF
imNvh/qhpW6A3zBsGce/6ygI857z6+/c39t2NSVFt/wX/FW9txRkIZHtNr4UuGoD
9iHQ2O0dfWSASgZ5jO5WIj6ONsOS29Dn7GnsOMasV4bJ8W1aLxVB+Ccu7pjc35lB
iwmgJ6FbxNGrfpimfHlVAChVKg2HTQOyw/qUV9uAVSsjjEXyKkW3g8vJV8b1DuNE
g3Pq2l/8Hj/FQgZedplhw7h1i/CinP9koIEvxE0BkYEt', '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAnpDoNafBAUKqDlIt4GTAMPzkZMYY03gek+GvERLvp60dFzbOvJZk
xLzix82EdwsiPC2GuQSYSULuCpUG3hr96tT4M4uWrBHGJ1x6jju6vMMvHVhOdr4z
cFLBqpq06SNnDJCxbc+47nwRup149GaD8QIhgeZ22amYxxyZm70OL4i5ZppVLigl
LrmbrV9uqOCpaSU2UZnFnFv7p6crMftybcJjSndfg9lq4UIrncexbGlxdiIEq4Xi
OScq0eDPA2c8UDTvb63I4Fiyj0T6NHtXNa1Qi5z8RyRg8KjyoKL4cFRIghA411Og
DX6ORJ5xnP+BuzV6mrXD30a8EY/i0oiYFwIDAQAB
-----END RSA PUBLIC KEY-----'),
    (5, 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIdwqlecoZ4ScCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCuM42M7xdes730NuTKJzT4BIIE
0OLYuDWvS4xleQMbVYe4WFzPr2LvJP58MGIrmtL/wGrIrFMiGjKeWtK+z7UDYpdu
eYdCWUjbqTj71yHRsO8e6u0PbCXAoDgDpiAqtCuhOpNdpKvHYu2fXCRwZ2B6ZYFx
EUwsQBbaPtXwo1aCOgtiZ4E5bVavH92VM1IQtVit3BINX9l50UQre9KDBz47YnGx
43aayVpC5bWoirZtsDuZWbXIRfJ/5BurzJgKUUYhE9goSGqrf5ImeuVdgJ3ooNmu
Q1+2JH77qUAlxrROvxAGDp8drVpb++HmHrzknNq+SqczteB8fNe3ynkDebcweuMH
Vp9TcPm9AsB0kePasq0nXJ6TAM8iAZrRJPc+AvSPFFX41/KBFtCbk9ASLjK0oamW
xqjZPeUfYkuH+qKLMhasEyiNEScWPJVb+PfmdWWGLy7lpkkIfRltdHO4D5m3C0jP
KZdCoV8+8fXBO6XnejYuPgPolG+iat8ahevSEXAMLVaHOFaSO4+14s8Ry2zbOR22
4W+iXRSjovd84G/lVjIsaV8CB6rxAqq9JKFupc4+udEYeWSy2/Gskb+shFW/vtLQ
zCSHqNINTaAgfm4Eby/CRGouOgKXKb1tP3BEmNahzzMocaMIVkNk3qv+ASf10yfa
djssrKYppF2vcJhWwrwScR/yW/bd7bG2H1VuUvsUpldli2ozLqnFak26q1MASffv
LKGj2OCtWLpud7JbDILL+T7s7aUOWVhTbyiSCKo7WMNupy1UiHr55gwGXoRXTosX
x8d19FHpr/9Nr9AILt0qzIzCWmawoy1htxb3xIjOWwZE/PMn+vQS6FSqZ/4cDP2U
ykBNIA3Beh8xVlCDSj/pfqhqPk0HvRNhJRLu8XCCS1FPGwaiK5F7psdC18awVMn7
KWEJmO+sL/g56TNL5Ga4/Bc+k0i5dIvtDSzz34ha04Vj4PsqTg1SoATz+QlXkRB1
RBpCBCCKkD33xdGWE7HOzc/2bBZ041AJckChlUSW8wcFMVEXVNXTfJVOmObuysGr
kFfdsUZr0ldP65duxUklL63sjTyGVXdLjtLTqA3513bpwGfY6chjBcsFGwbnwkAi
EpPZxDsQPa1lW5mR9FmOWlBdeijSC23yX0tABIhVzbbznyfD7rAZYZUgF4UH8vyn
ug+pFZrznHgGeO3rxt2eU/BHe9DV4Aq3j8PnSX8uzsw16v5eOaWgGH9PpJht7qQZ
aZbIs2YPDqPbGbhDXyBjsQb+JlfTyjah7US1BAQTzXBtbi8pRWEAJgzW0u5Ef35n
mjUDDuBdFTwbHwwopReZuvfOd/1SPqCITeRZO/j3gfXvseU1B0z+ak5aeARPGg9B
H1HMfjfyk1UL+EWTSaEEpyUfs4PLVLCKd3Qr9nlX0wsf6YM9h5YYgPNqTB9Q/BdG
e05VLtmgBuBXGFW5URbuiBdCqxc7vZsRgv35KziYwcAwOpq35l5nAZ06iei2W7b0
q9SWwUGU9gt/tkh1ELH2fLSibvSbjC0jJLIJedkCylqELHHDDGFzG+MRmRy391Hc
uIOtg+XYuLMq0bwqB4fTVJSAQgjcwHiQeN6tp0IDFqANgXXq7aT4SP2WmbziQTPQ
rAU/heMyz/uouZNqKbq1Q3fNi41C34en3DAmN6dwyQfQ', '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAwZYUADwvG5hA0fQ3SXEvPqG2cNcfG94yzL1IADnfYDLrAkTVhUzx
rUwCuA/zv80JOX20oZvY6vvNaywuLG0MMuD0672ROGjWSiq7qbVEomNmtthhjhn9
idkDu3rzGMy1aNaMybtUIxw2IoWxaF2KTzvH21rtUxnsQC2dVYQi5fV8j6u/k6Ks
Nl9uq9iX6p6xQcW45e1pBNQ/Uc2PODo/YAZPmbZB7Lv7OEHNlu4KD43nOhYZNkiv
9asB+jTG0nrPBPx8jwIChXu02In9xxMWEBG3NpKPyr8Cx2xf9GxtjntGyVtAnaMg
jw5qqdJFKcglNRfGr8612j4EtORkxliwywIDAQAB
-----END RSA PUBLIC KEY-----');