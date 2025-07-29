const express = require('express');
const router = express.Router();

const Direccion_Controller = require('../controller/mdireccionlugarController');
router.get('/', Direccion_Controller.list);
router.post('/', Direccion_Controller.save);
router.delete('/:Id_Dr', Direccion_Controller.delete);
router.get('/:Id_Dr',Direccion_Controller.edit);
router.post('/:Id_Dr', Direccion_Controller.update);

module.exports = router;