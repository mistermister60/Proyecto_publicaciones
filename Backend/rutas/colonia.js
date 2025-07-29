const express = require('express');
const router = express.Router();

const Colonia_Controller = require('../controller/ccoloniaController');
router.get('/', Colonia_Controller.list);
router.post('/', Colonia_Controller.save);
router.delete('/:Id_Col', Colonia_Controller.delete);
router.get('/:Id_Col',Colonia_Controller.edit);
router.post('/:Id_Col', Colonia_Controller.update);

module.exports = router;