const express = require('express');
const bodyParser = require('body-parser');
const Connexion = require('./db');
const Autorisation = require('./auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = Connexion('localhost', 'root', 'password', 'Lawrence');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Fichier HTML de connexion
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;
    
    Autorisation(connection, login, password, (isAuthorized) => {
        if (isAuthorized) {
            res.redirect('/accueil');
        } else {
            res.send('Login ou mot de passe incorrect.');
        }
    });
});

app.get('/accueil', (req, res) => {
    // Page d'accueil accessible après l'autorisation
    res.sendFile(__dirname + '/accueil.html');
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
 
module.exports = afficherUtilisateurs;

function afficherUtilisateurs(connection, callback) {
  const query = 'SELECT * FROM Utilisateur';

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération des utilisateurs:', err.message);
          callback([]);
      } else {
          callback(results);
      }
  });
}




//Se connecter a la BDD

const mysql = require('mysql');

module.exports = Connexion;

function Connexion(serveur, user, passwd, bdd) {
    const connection = mysql.createConnection({
        host: serveur,
        user: user,
        password: passwd,
        database: bdd
    });

    connection.connect(err => {
        if (err) {
            console.error('Erreur de connexion :', err.message);
            return false;
        }
        console.log('Connexion à la BDD réussie');
        return true;
    });

    return connection;
}

// Autoriser un utilisateur

module.exports = Autorisation;
function Autorisation(connection, login, passwd, callback) {
  const query = 'SELECT * FROM Utilisateur WHERE Login = ? AND Password = ?';
  
  connection.query(query, [login, passwd], (err, results) => {
      if (err) {
          console.error('Erreur lors de la requête:', err.message);
          callback(false);
      }

      if (results.length > 0) {
          callback(true); // L'utilisateur est autorisé
      } else {
          callback(false); // L'utilisateur n'est pas autorisé
      }
  });
}

//modifier un utilisateur 
module.exports = Modification_user;
function Modification_user(connection, login, passwd, userData, callback) {
  const querySelect = 'SELECT * FROM Utilisateur WHERE Login = ? AND Password = ?';
  
  connection.query(querySelect, [login, passwd], (err, results) => {
      if (err || results.length === 0) {
          console.error('Erreur ou utilisateur non trouvé');
          callback(false);
          return;
      }
      
      const queryUpdate = 'UPDATE Utilisateur SET Nom = ?, Prenom = ?, Mail = ? WHERE Login = ?';
      const { nom, prenom, mail } = userData;

      connection.query(queryUpdate, [nom, prenom, mail, login], (err) => {
          if (err) {
              console.error('Erreur lors de la mise à jour:', err.message);
              callback(false);
          } else {
              callback(true); // Modification réussie
          }
      });
  });
}


// Supprimer un utilisateur
module.exports = Suppression_user;

function Suppression_user(connection, login, passwd, callback) {
  const querySelect = 'SELECT * FROM Utilisateur WHERE Login = ? AND Password = ?';

  connection.query(querySelect, [login, passwd], (err, results) => {
      if (err || results.length === 0) {
          console.error('Utilisateur non trouvé ou erreur:', err.message);
          callback(false);
          return;
      }
      
      const queryDelete = 'DELETE FROM Utilisateur WHERE Login = ?';
      connection.query(queryDelete, [login], (err) => {
          if (err) {
              console.error('Erreur lors de la suppression:', err.message);
              callback(false);
          } else {
              callback(true); // Suppression réussie
          }
      });
  });
}


