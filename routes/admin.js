const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get all pending submissions
router.get('/pending', async (req, res) => {
    const payments = await Payment.find({ status: 'pending' });
    res.json(payments);
});

// Approve a payment
router.post('/approve/:id', async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).send('Submission not found.');
    payment.status = 'approved';
    await payment.save();
    res.send('Payment approved.');
});

// Reject a payment
router.post('/reject/:id', async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).send('Submission not found.');
    payment.status = 'rejected';
    await payment.save();
    res.send('Payment rejected.');
});

module.exports = router;
