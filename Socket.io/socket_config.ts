/**
 * Confogurazione server per l'implementazione di WebSocket con Socket.IO
 */

const express = require('express');
const http = require('http');

export const app2 = express();
export const server = http.createServer(app2);

const { Server } = require("socket.io");
export const io = new Server(server);