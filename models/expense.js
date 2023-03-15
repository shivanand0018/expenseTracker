const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Expenses = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATE
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    amount: Sequelize.DOUBLE
})

module.exports = Expenses;