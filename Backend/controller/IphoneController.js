const Iphone = require('../models/IphoneModels');

exports.getAllIphones = async (req, res) => {
    try {
        const iphones = await Iphone.find(); 
        res.status(200).json(iphones); 
    } catch (error) {
        console.error('Error fetching iPhones:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};

exports.getClientById = async (req, res) => {
    const { id } = req.params; 
    try {
        const client = await Iphone.findById(id); 
        if (!client) {
            return res.status(404).json({ message: 'Client not found' }); 
        }
        res.status(200).json(client); 
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};

exports.updateClientById = async (req, res) => {
    const { id } = req.params; 
    const updateData = req.body; 
    try {
        const updatedClient = await Iphone.findByIdAndUpdate(id, updateData, { new: true }); 
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' }); 
        }
        res.status(200).json(updatedClient); 
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};

exports.deleteClientById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }

    try {
        const deletedClient = await Iphone.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createClient = async (req, res) => {
    const clientData = req.body;

    // Ensure that clientData does not contain an _id field
    delete clientData._id; // Agar _id field hai toh usse hata rahe hain

    try {
        const newClient = new Iphone(clientData);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error creating client:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error: Client already exists' }); 
        }
        res.status(500).json({ message: 'Internal server error' }); 
    }
};


