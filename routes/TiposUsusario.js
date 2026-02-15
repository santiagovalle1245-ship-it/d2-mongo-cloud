const express = require('express');
const router = express.Router();
const TipoUsuarioController = require('../controllers/TipoUsuarioController');


router.post('/', TipoUsuarioController.crearTipoUsuario);// Crear un nuevo tipo de usuario
router.get('/', TipoUsuarioController.obetenerTiposUsuario);// Obtener todos los tipos de usuario
router.put('/:id', TipoUsuarioController.actualizarTipoUsuario);// Actualizar un tipo de usuario
router.delete('/:id', TipoUsuarioController.eliminarTipoUsuario);// Eliminar un tipo de usuario

module.exports = router;