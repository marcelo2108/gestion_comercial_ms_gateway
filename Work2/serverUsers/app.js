// app.js
const express = require('express');
const User = require('./models/Users');
const sequelize = require('./db');

const app = express();
app.use(express.json());

// Sincronizar el modelo con la base de datos (si la tabla no existe, la crea)
sequelize.sync()
    .then(() => console.log('Sincronización completa'))
    .catch((error) => console.error('Error al sincronizar:', error));

// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Endpoint para agregar un usuario
app.post('/users', async (req, res) => {
    const { mail, nombre } = req.body;
    try {
        const newUser = await User.create({ mail, nombre });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});

// Configurar el puerto y escuchar conexiones
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Microservicio de usuarios ejecutándose en el puerto ${PORT}`);
});
