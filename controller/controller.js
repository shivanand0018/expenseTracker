const path = require('path')
const expense = require('../models/expense')

exports.getView = async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
}

exports.postExpense = async (req, res) => {
    try {
        console.log('hi');
        const date = req.body.date;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;
        const data = await expense.create({
            date: date,
            category: category,
            description: description,
            amount: amount
        })
        res.json({ data: data })
    }
    catch (err) {
        console.log(err);
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const data = await expense.findAll();
        res.json({ data: data })
    }
    catch (err) {
        console.log(err);
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await expense.destroy({ where: { id: id } })
        console.log(resp);
        res.status(204).json({ resp });
        console.log("deleted");
    }
    catch (err) {
        console.log(err);
    }
}

exports.getExpense = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await expense.findByPk(id)
        console.log(res);
        res.json({ data: resp })
    }
    catch (err) {
        console.log(err);
    }
}

exports.updateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const date = req.body.date;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;
        console.log(id);

        const resp1 = await expense.upsert({
            id: id,
            date: date,
            category: category,
            description: description,
            amount: amount
        })
        res.json({
            data: {
                id: id,
                date: date,
                category: category,
                description: description,
                amount: amount
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}