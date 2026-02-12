const express = require('express');
const connectDB = require('./db');
const mongoose = require('mongoose'); // Importamos mongoose aquí también

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Conectar a la base de datos
connectDB();

// 2. Definir el "Molde" del Usuario AQUÍ MISMO 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

// Creamos el modelo usando ese molde
const User = mongoose.model('User', userSchema);

// Middleware para entender JSON
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('Hello, MongoDB! Todo funcionando.');
});

// 3. Ruta para CREAR el usuario y mandarlo a la Base de Datos
app.post('/users', async (req, res) => {
    try {
        console.log("Intentando guardar usuario:", req.body); // Para ver en consola qué llega
        
        const newUser = new User(req.body); // Crea el usuario con lo que le envíes
        await newUser.save(); // Lo guarda en MongoDB Atlas
        
        res.status(201).json(newUser); // Te responde con el usuario creado
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