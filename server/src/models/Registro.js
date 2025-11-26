const Sequelize = require('sequelize');
const database = require('../config/database');

const Registro = database.define('registro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT, 
        allowNull: false
    },
    data: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Registro;