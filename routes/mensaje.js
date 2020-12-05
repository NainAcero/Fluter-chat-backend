const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/valodar-jwt');

const router = Router();

/**
 * api/mensajes
 */

router.get('/:de', validarJWT, obtenerChat);

module.exports = router;
