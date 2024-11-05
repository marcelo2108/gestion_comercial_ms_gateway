//db.js
const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('user', 'postgres', 'abc123', {
    host: 'localhost',    // Cambia esto si PostgreSQL está en otro servidor
    dialect: 'postgres',
    logging: true,       // Puedes habilitarlo para depurar consultas SQL
});

// Probar la conexión
sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error al conectar:', error));

module.exports = sequelize;
