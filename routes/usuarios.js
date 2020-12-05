const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/valodar-jwt');

const router = Router();

/**
 * api/usuarios
 */

router.get('/', validarJWT, getUsuarios);

module.exports = router;
