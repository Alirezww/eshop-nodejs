const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

})

const PaymentModel = mongoose.model("Payment", PaymentSchema);

module.exports = PaymentModel