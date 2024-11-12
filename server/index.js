const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Assurez-vous de remplacer par votre nom d'utilisateur MySQL
  password: '', // Assurez-vous de remplacer par votre mot de passe MySQL
  database: 'login'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      res.json("Already registered");
    } else {
      // Insérer un nouvel utilisateur
      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
        if (err) return res.json(err);
        res.json({ id: result.insertId, email, password });
      });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Chercher l'utilisateur dans la base de données
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const user = result[0];
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found!");
    }
  });
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
