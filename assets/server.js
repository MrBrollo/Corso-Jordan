const express = require('express'); //importo la libreria in pagina
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');


const app = express();
const port = 3000;

//Configuro la connessione a PostgreSQL

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demoDB',
    password: 'admin',
    port: 5432,
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static file serving
app.use('/assets', express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '..')));

//Prendo index.html dalla root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

//Gestione POST del form

app.post('/register', async (req, res) => {
    const {
        nomeUtente,
        email,
        password,
        dataNascita,
        numeroTelefono,
        genere,
        newsletter,
        terms
    } = req.body;

    try {
        const query = `
        INSERT INTO "RegistrationForm"
        (nome_utente, email, password, birth_date, phone_number, genere, newsletter, termini)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const values = [
            nomeUtente,
            email,
            password,
            dataNascita,
            numeroTelefono,
            genere,
            newsletter === "sì",
            terms === true
        ];

        await pool.query(query, values)
        res.status(200).json({ message: 'Utente registrato con successo!' });
    } catch (error) {
        console.error("Errore durante l'inserimento: ", error);
        res.status(500).json('Errore nella registrazione');
    }
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});