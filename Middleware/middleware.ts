var express = require('express');
const jwt = require('jsonwebtoken');
import {ErrorMsgEnum, getErrorMsg} from "../ResponseMsg/errorMsg";
//const { isNewExpression } = require('typescript'); non sono sicuro serva
var app = express();

//FUNZIONI DEDICATE AL JWT

export function myLogger (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
};

/*export function requestTime (req: any, res: any, next: any) {
      req.requestTime = Date.now();
      next();
};*/
  
export function checkHeader(req: any, res: any, next: any){
      const authHeader = req.headers.authorization;
      if (authHeader) {
          next();
      }else{
          next(ErrorMsgEnum.NoHeader);
      }
};
  
export function checkToken(req: any, res: any, next: any){
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!=='undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token=bearerToken;
        next();
        }   
        else{
            res.sendStatus(403);
        }
    }
    catch(error){
        next(ErrorMsgEnum.NoToken);
    }
    
}
  
export function verifyAndAuthenticate(req: any, res: any, next: any){
    try{
        let decoded = jwt.verify(req.token, process.env.KEY!);
        if(decoded !== null){
            req.user = decoded;
            next();
        } 
    }
    catch(error){
        next(ErrorMsgEnum.NoTokenValid)
    }
}

export function checkPayload(req: any, res: any, next: any){
    if((req.utente.ruolo === 'Admin' || req.user.ruolo === 'bid_creator' || req.user.ruolo === 'bid_participant')
    && (typeof req.utente.idUtente === 'string') && (req.utente.idUtente.length <= 50)
    && (req.utente.idUtente != null)){
        next();
    }
    else ErrorMsgEnum.NoValidIdUtente;
}




/*export function logErrors(err: any, req: any, res: any, next: any) {
      console.error(err.stack);
      next(err);
}*/