const express = require('express');
const router = express.Router();

const Usuario_Controller = require('../controller/musuarioController');
router.get('/', Usuario_Controller.list);
router.post('/', Usuario_Controller.save);
router.delete('/:Id_usu', Usuario_Controller.delete);
router.get('/:Id_usu',Usuario_Controller.edit);
router.post('/:Id_usu', Usuario_Controller.update);

module.exports = router;