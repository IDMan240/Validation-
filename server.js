const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows your frontend to talk to this server

app.get('/verify', async (req, res) => {
    const { account, bank } = req.query;
    // IMPORTANT: Replace with your actual Test Secret Key
    const secretKey = 'Bearer sk_test_...'; 

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
