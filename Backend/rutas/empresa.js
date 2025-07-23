const express = require('express');
const router = express.Router();

const Empresa_Controller = require('../controller/mempresaController');
router.get('/', Empresa_Controller.list);
router.post('/', Empresa_Controller.save);
router.delete('/:Id_emp', Empresa_Controller.delete);
router.get('/:Id_emp',Empresa_Controller.edit);
router.post('/:Id_emp', Empresa_Controller.update);

module.exports = router;