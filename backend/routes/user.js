const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const path = require('path');

// Submit payment code
router.post('/submit-payment', async (req, res) => {
    const { name, phone, mpesa_code } = req.body;
    if (!name || !phone || !mpesa_code) return res.status(400).send('All fields are required.');

    const payment = new Payment({ name, phone, mpesa_code });
    await payment.save();
    res.send('Payment submitted! You will get a download link once approved.');
});

// Download PDF using unique link
router.get('/download/:link', async (req, res) => {
    const payment = await Payment.findOne({ download_link: req.params.link });
    if (!payment) return res.status(404).send('Link not found.');
    if (payment.status !== 'approved') return res.status(403).send('Payment not approved yet.');

    res.sendFile(path.join(__dirname, '../public', payment.pdf));
});

module.exports = router;
