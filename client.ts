export const io = require("socket.io-client");
export const socket = io("http://localhost:3000");
import * as readline from 'node:readline';

socket.on('message', (message: any) => {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(message, (answer: any) => {
        console.log("Il nome utente inserito è: ", answer);
        rl.close();
        socket.emit('join server', answer);
    });
})

//const username = 'client1';
/*
socket.on('message', (message: any) => {
    console.log(message);
})
*/
//socket.emit('join server', username);

socket.on('new user', (message: any) => {
    console.log('utenti collegati: ', message);
})

socket.on('domanda', (message: any) => {
    var rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl2.question(message, function(answer: any) {
        console.log("L'asta selezionata è: ", answer);
        rl2.close();
        socket.emit('join room', answer);
    });
})

socket.on('room joined', (message: any) => {
    console.log(message);
})

socket.on('not room joined', (message: any) => {
    console.log(message);
})