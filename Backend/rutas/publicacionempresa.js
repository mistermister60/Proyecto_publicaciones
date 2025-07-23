const express = require('express');
const router = express.Router();

const EmpresaPublicacion_Controller = require('../controller/mpublicacionempresaController');
router.get('/', EmpresaPublicacion_Controller.list);
router.post('/', EmpresaPublicacion_Controller.save);
router.delete('/:Id_pube', EmpresaPublicacion_Controller.delete);
router.get('/:Id_pube',EmpresaPublicacion_Controller.edit);
router.post('/:Id_pube', EmpresaPublicacion_Controller.update);

module.exports = router;