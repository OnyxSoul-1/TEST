const http = require('http');
const WebSocket = require('ws'); // You will need to run: npm install ws

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat server is running!');
});

// Attach a WebSocket server to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('A new user connected!');

    // Listen for messages from any user
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => console.log('A user disconnected.'));
});

// Run the server on port 3000
server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
