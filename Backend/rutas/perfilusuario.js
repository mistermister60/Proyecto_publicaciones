const express = require('express');
const router = express.Router();

const PerfilUsuario_Controller = require('../controller/dperfilusuarioController');
router.get('/', PerfilUsuario_Controller.list);
router.post('/', PerfilUsuario_Controller.save);
router.delete('/:id_per', PerfilUsuario_Controller.delete);
router.get('/:id_per',PerfilUsuario_Controller.edit);
router.post('/:id_per', PerfilUsuario_Controller.update);

module.exports = router;