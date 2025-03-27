const mongoose = require('mongoose');

// Define the schema for the iPhone model
const iphoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
   
    color: {
        type: String,
        required: true,
    },
    storage: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    url: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Create the model from the schema
const Iphone = mongoose.model('Iphone', iphoneSchema);

// Export the model
module.exports = Iphone;
