const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../connection/connection");

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario, clave } = req.body;
  db.query("SELECT * FROM musuario WHERE Ma_usu = ? AND Pes_usu = ?", [usuario,clave], (err, usuarios) => {
    if (err) return res.status(500).send("Error");
    if (usuarios.length === 0) return res.status(401).send("Credenciales inválidas");

    const user = usuarios[0];
    if (user.token_activo) return res.status(403).send("Sesión ya activa");

    const token = jwt.sign({ cusuario: user.usuario, ctipousuario: user.perfilusuario }, "secreto");
    db.query("UPDATE musuario SET token_activo = ? WHERE Id_usu = ?", [token, user.cusuario], err2 => {
      if (err2) return res.status(500).send("Error al guardar token");
      res.json({ token, user });
    });
  });
});

router.post("/logout", (req, res) => {
  const { cusuario } = req.body;
  db.query("UPDATE musuario SET token_activo = NULL WHERE Id_usu = ?", [cusuario], err => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.sendStatus(200);
  });
});

module.exports = router;
