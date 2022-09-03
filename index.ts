/* var express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

var myLogger = function (req: any, res: any, next: any) {
    console.log('LOGGED');
    next();
  };

app.use(myLogger);

app.get('/', (req: any, res: any)=>{
    res.send('Hello');
});

app.get('/test', (req: any, res: any)=>{
    res.send('Hello world');
}); */