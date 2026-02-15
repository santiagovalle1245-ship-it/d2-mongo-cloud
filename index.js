const express = require('express');
const connectDB = require('./db');
const mongoose = require('mongoose');

// ---> CAMBIO 1: Importar tu archivo de rutas aquí arriba
const tiposUsuarioRutas = require('./routes/TiposUsusario'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Middleware para entender JSON
app.use(express.json());
app.use(express.static('public'));

// ---> CAMBIO 2: Decirle al servidor que use tus rutas cuando visiten '/api/tipos-usuario'
app.use('/api/tipos-usuario', tiposUsuarioRutas);


// Ruta para CREAR el usuario original
app.post('/users', async (req, res) => {
    try {
        console.log("Intentando guardar usuario:", req.body);
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
        console.log("¡Usuario guardado con éxito!");
    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});