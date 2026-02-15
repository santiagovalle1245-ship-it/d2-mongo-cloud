const mongoose = require('mongoose');

const TipoUsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TipoUsuario', TipoUsuarioSchema);