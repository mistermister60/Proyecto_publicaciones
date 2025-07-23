const express = require('express');
const router = express.Router();

const Servicio_Controller = require('../controller/cservicioController');
router.get('/', Servicio_Controller.list);
router.post('/', Servicio_Controller.save);
router.delete('/:Id_serv', Servicio_Controller.delete);
router.get('/:Id_serv',Servicio_Controller.edit);
router.post('/:Id_serv', Servicio_Controller.update);

module.exports = router;