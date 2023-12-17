const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kuzhpixel:axbwJWdQfYudmY29@kuzhpixel.evpwqky.mongodb.net/Intership', { useNewUrlParser: true, useUnifiedTopology: true });

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    type: String,
    date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);

// API endpoints
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/expenses', async (req, res) => {
    try {
        const { name, amount, type, date } = req.body;
        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const expense = new Expense({
            name,
            amount,
            type,
            date: parsedDate,
        });

        await expense.save();
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json(deletedExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
