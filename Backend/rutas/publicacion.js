const express = require('express');
const router = express.Router();

const Publicacion_Controller = require('../controller/epublicacionController');
router.get('/', Publicacion_Controller.list);
router.post('/', Publicacion_Controller.save);
router.delete('/:Id_Pub', Publicacion_Controller.delete);
router.get('/:Id_Pub',Publicacion_Controller.edit);
router.post('/:Id_Pub', Publicacion_Controller.update);

module.exports = router;