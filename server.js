"use strict";
const http = require("http");
let conuter = 0;

function createServer() {
  return http
    .createServer(function(req, res) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK\n");
    })
    .listen(8080);
}

let server = createServer();

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (server) {
      if (conuter > 5) {
        server.close();
        server = null;
        res.end("Shutting down...\n");
        conuter = 0;
      } else {
        res.end(`Counter: ${conuter++}...\n`);
      }
    } else {
      server = createServer();
      res.end("Starting up...\n");
    }
  })
  .listen(8081);
