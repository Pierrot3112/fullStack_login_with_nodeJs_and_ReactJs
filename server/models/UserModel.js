const db = require('./db'); // Assurez-vous d'avoir une connexion MySQL configurée dans ce fichier

const UserModel = {
    // Fonction pour insérer un nouvel utilisateur
    createUser: (userData, callback) => {
        const { name, email, password } = userData;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    // Fonction pour rechercher un utilisateur par email
    findUserByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    }
};

module.exports = UserModel;
