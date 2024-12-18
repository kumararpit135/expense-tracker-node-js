const Sequelize = require('sequelize')



const sequelize = new Sequelize('expensetracker', 'root', '20130008890',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;