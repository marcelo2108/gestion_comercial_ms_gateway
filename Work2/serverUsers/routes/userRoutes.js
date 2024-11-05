// routes/userRoutes.js
const express = require('express');
const User = require('./models/Users');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Agregar un nuevo usuario
router.post('/', async (req, res) => {
    const { email, nombre } = req.body;
    try {
        const newUser = await User.create({ email, nombre });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.nombre = nombre;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Borrar un usuario por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

module.exports = router;
