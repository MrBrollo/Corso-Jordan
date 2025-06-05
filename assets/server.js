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

//Middleware per gestione richieste
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static file per gli asset JS/CSS
app.use('/assets', express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '..')));

//route GET per servire index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/utenti', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT nome_utente, email, birth_date, phone_number, genere
            FROM "RegistrationForm"
        `);
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error("Errore nel recupero degli utenti:", error);
        res.status(500).json({ error: "Errore durante il recupero dei dati" });
    }
});

//Gestione POST del form

app.post('/register', async (req, res) => {
    //destrutturo i dati ricevuti dal client
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
        const emailCheck = await pool.query(
            `SELECT * FROM "RegistrationForm" WHERE email = $1`,
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email già registrata" });
        }

        // query per inserimento dei dati nella tabella
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

        await pool.query(query, values) //esegue la query 
        res.status(200).json({ message: 'Utente registrato con successo!' });
    } catch (error) {
        console.error("Errore durante l'inserimento: ", error);
        res.status(500).json('Errore nella registrazione');
    }
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});