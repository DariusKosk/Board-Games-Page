const express = require('express');
const pool = require('./database.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/boardgames', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM boardgames');
        res.json(rows);
    } catch (err) {
        console.error(err);
    }
});

app.use((err) => {
    console.error(err.stack);
});
