const jwt = require('jsonwebtoken');
const db = require('../connection/connection');
const SECRET = 'Logistic';

exports.login = function (req, res) {
  const { usuario, clave } = req.body;

  const query = `
    SELECT u.Id_usu, u.Ma_usu, u.Nom_usu, u.Pes_usu, u.Nac_usu, u.Ban_usu, u.Reponsable_usu, u.Estado, u.logged_in, u.id_per,
           p.des_per AS perfil
    FROM musuario u
    LEFT JOIN perfilusuario p ON u.id_per = p.id_per
    WHERE u.Ma_usu = ? AND u.Pes_usu = ?`;

  db.query(query, [usuario, clave], function (err, usuarios) {
    if (err) return res.status(500).send('Error DB');
    if (usuarios.length === 0) return res.status(401).send('Credenciales inválidas');

    const user = usuarios[0];

    if (user.logged_in) {
      return res.status(403).send('Usuario ya tiene una sesión activa');
    }

    db.query('UPDATE musuario SET logged_in = 1 WHERE Id_usu = ?', [user.Id_usu], function (err2) {
      if (err2) return res.status(500).send('Error al iniciar sesión');

      const token = jwt.sign(
        {
          Id_usu: user.Id_usu,
          Ma_usu: user.Ma_usu,
          Nom_usu: user.Nom_usu,
          perfil: user.perfil // nombre del perfil
        },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, user });
    });
  });
};

exports.logout = function (req, res) {
  const Id_usu = req.user.Id_usu;
  db.query('UPDATE musuario SET logged_in = 0 WHERE Id_usu = ?', [Id_usu], function (err) {
    if (err) return res.status(500).send('Error cerrando sesión');
    res.send('Sesión cerrada');
  });
};
