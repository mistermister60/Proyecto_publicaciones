const express = require('express');
const router = express.Router();

const Colonia_Controller = require('../controller/ccoloniaController');
router.get('/', Colonia_Controller.list);
router.post('/', Colonia_Controller.save);
router.delete('/:ccolonia', Colonia_Controller.delete);
router.get('/:ccolonia',Colonia_Controller.edit);
router.post('/:ccolonia', Colonia_Controller.update);

module.exports = router;