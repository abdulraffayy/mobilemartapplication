const express = require('express');
const router = express.Router();
const { getAllIphones, getClientById, updateClientById, createClient, deleteClientById } = require('../controller/IphoneController');

// Product routes
router.get('/products', getAllIphones);
router.get('/products/:id', getClientById);
router.put('/products/iphones', updateClientById);
router.delete('/products/:id', deleteClientById);
router.post('/products', createClient);

module.exports = router;