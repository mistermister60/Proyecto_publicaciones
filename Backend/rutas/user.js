const express = require('express');
const router = express.Router();
require('dotenv').config();
const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { userName, pass } = req.body;
  mysqlConnection.query('SELECT * FROM musuario WHERE Ma_usu = ? and Pes_usu=?', [userName,pass], async (err, usuarios) => {
    if (err) return res.status(500).json({ error: err });
    if (usuarios.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

    const user = usuarios[0];
  
    const token = jwt.sign(
      { id: user.Id_usu, role: user.id_per },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
      
    );

    console.log(token);

    res.json({ token });
  });
});
// Middleware de verificación
const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      req.user = user;
      next();
    });
  };
};
// Rutas protegidas
router.get('/Administrador', verifyToken([1]), (req, res) => {
  res.json({ message: 'Acceso permitido para Administrador' });
});

router.get('/Residente', verifyToken([1, 2]), (req, res) => {
  res.json({ message: 'Acceso permitido para usuarios Residentes' });
});

router.get('/Empresa', verifyToken([1, 3]), (req, res) => {
  res.json({ message: 'Acceso permitido para usuarios Empresa' });
});

module.exports = router;
