const express = require('express');
const router = express.Router();
const { getAllIphones, getClientById, updateClientById, createClient,  deleteClientById} = require('../controller/IphoneController');

// This will be accessible at /api/iphones/iphone
router.get('/products', getAllIphones);
router.get('/products/:id', getClientById);
router.put('/products/:id', updateClientById);
router.delete('/products/:id', deleteClientById);
router.post('/products/', createClient);





module.exports = router;