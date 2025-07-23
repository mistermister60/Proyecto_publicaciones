const express = require('express');
const router = express.Router();

const PerfilEmpresa_Controller = require('../controller/dperfilempresaController');
router.get('/', PerfilEmpresa_Controller.list);
router.post('/', PerfilEmpresa_Controller.save);
router.delete('/:Id_pemp', PerfilEmpresa_Controller.delete);
router.get('/:Id_pemp',PerfilEmpresa_Controller.edit);
router.post('/:Id_pemp', PerfilEmpresa_Controller.update);

module.exports = router;