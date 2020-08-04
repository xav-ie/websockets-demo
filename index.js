const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

const httpserver = http.createServer((req, res) => {
  console.log("we have received a request");
});

const websocket = new WebSocketServer({
  httpServer: httpserver,
});

websocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("pause", () => console.log("Opened!!!"));
  connection.on("resume", () => console.log("Resumed!!!"));
  connection.on("close", () => console.log("Closed!!!"));
  connection.on("message", (message) => {
    console.log(`Received messsage: ${message.utf8Data}`);
  });
  sendEveryFiveSeconds();
});

httpserver.listen(8080, () =>
  console.log("Server listening on localhost:8080 ...")
);

function sendEveryFiveSeconds() {
  connection.send(`Message ${Math.random()}`);
  setTimeout(sendEveryFiveSeconds, 5000);
}
