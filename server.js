const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows your frontend to talk to this server

app.get('/verify', async (req, res) => {
    const { account, bank } = req.query;
// Ensure PAYSTACK_SECRET_KEY is the name of the variable you saved in Render
const secretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`; 

    const url = `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=${bank}`;

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': secretKey }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to Paystack" });
    }
});

// Change this:
// app.listen(3000, () => console.log('Server running!'));

// To this:
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

