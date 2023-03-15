const express = require('express')
const router = express.Router();
const controller = require('../controller/controller')

router.get('/', controller.getView)

router.post('/post', controller.postExpense)

router.get('/getExpenses',controller.getExpenses)

router.delete('/delete/:id',controller.deleteExpense)

router.get('/getExpense/:id',controller.getExpense)

router.put('/updateExpense/:id',controller.updateExpense)

module.exports = router