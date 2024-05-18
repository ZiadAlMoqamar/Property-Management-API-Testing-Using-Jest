const express = require('express');
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');

// Mock database
let properties = [];
let tenants = [];

// Mock functions using jest.fn()
const db = {
    findProperty: jest.fn((id) => properties.find(p => p.id === id)),
    insertProperty: jest.fn((data) => {
        const id = uuidv4();
        const newProperty = { id, ...data };
        properties.push(newProperty);
        return id;
    }),
    updateProperty: jest.fn((id, newData) => {
        const index = properties.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Property not found.');
        }
        properties[index] = { ...properties[index], ...newData };
    }),
    deleteProperty: jest.fn((id) => {
        const index = properties.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Property not found.');
        }
        properties.splice(index, 1);
    }),
    findAllProperties: jest.fn(() => properties),
    // Tenant operations
    findTenant: jest.fn((id) => tenants.find(t => t.id === id)),
    insertTenant: jest.fn((data) => {
        const id = uuidv4();
        const newTenant = { id, ...data };
        tenants.push(newTenant);
        return id;
    }),
    updateTenant: jest.fn((id, newData) => {
        const index = tenants.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error('Tenant not found.');
        }
        tenants[index] = { ...tenants[index], ...newData };
    }),
    deleteTenant: jest.fn((id) => {
        const index = tenants.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error('Tenant not found.');
        }
        tenants.splice(index, 1);
    }),
    findAllTenants: jest.fn(() => tenants)
};


// Express routes
// Properties Endpoints
app.get('/properties', (req, res) => {
    res.status(200).json(db.findAllProperties());
});

app.post('/properties', (req, res) => {
    const { name, address, rent, is_available } = req.body;
    try {
        const id = db.insertProperty({ name, address, rent, is_available });
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/properties/:id', (req, res) => {
    const property = db.findProperty(req.params.id);
    if (property) {
        res.status(200).json(property);
    } else {
        res.status(404).send('Property not found');
    }
});

app.put('/properties/:id', (req, res) => {
    try {
        db.updateProperty(req.params.id, req.body);
        res.status(200).send('Property updated');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.delete('/properties/:id', (req, res) => {
    try {
        db.deleteProperty(req.params.id);
        res.status(200).send('Property deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Tenants Endpoints
app.get('/tenants', (req, res) => {
    res.status(200).json(db.findAllTenants());
});

app.post('/tenants', (req, res) => {
    const { name, email, phone, property_id } = req.body;
    try {
        const id = db.insertTenant({ name, email, phone, property_id });
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/tenants/:id', (req, res) => {
    const tenant = db.findTenant(req.params.id);
    if (tenant) {
        res.status(200).json(tenant);
    } else {
        res.status(404).send('Tenant not found');
    }
});

app.put('/tenants/:id', (req, res) => {
    try {
        db.updateTenant(req.params.id, req.body);
        res.status(200).send('Tenant updated');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.delete('/tenants/:id', (req, res) => {
    try {
        db.deleteTenant(req.params.id);
        res.status(200).send('Tenant deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = app;
