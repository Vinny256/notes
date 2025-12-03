const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PaymentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mpesa_code: String,
    status: { type: String, default: "pending" },
    pdf: { type: String, default: "sch306_notes.pdf" },
    download_link: { type: String, default: () => uuidv4() }, // unique link
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
