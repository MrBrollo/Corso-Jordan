const express = require("express"); //importo la libreria in pagina
const path = require("path");
const app = express(); //la libreria viene inizializzata
const port = 3000; //porta per il server di sviluppo creato da node.js

// prendo i contenuti statici del sito
app.use(express.static(path.join(__dirname)));

// chiamata di get
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
}) 