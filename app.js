const { PROPERTIES_ENDPOINT, PROPERTY_ENDPOINT, TENANTS_ENDPOINT, TENANT_ENDPOINT } = require('./globals');
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
app.get(PROPERTIES_ENDPOINT, (req, res) => {
    res.status(200).json(db.findAllProperties());
});

app.post(PROPERTIES_ENDPOINT, (req, res) => {
    const { name, address, rent, is_available } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Empty payload is not allowed' });
    }
    if (rent === undefined){
        return res.status(400).json({ error: 'Rent cannot be undefined' });
    }
    if (rent <= 0) {
        return res.status(400).json({ error: 'Invalid rent provided' });
    }

    try {
        const id = db.insertProperty({ name, address, rent, is_available });
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: 'Malformed property data' });
    }
});

app.get(PROPERTY_ENDPOINT+':id', (req, res) => {
    const { id } = req.params;
    const property = db.findProperty(id);
    if (property) {
        res.status(200).json(property);
    } else {
        res.status(404).json({ error: 'Invalid property ID' });
    }
});


app.put(PROPERTY_ENDPOINT + ':id', (req, res) => {
    const { rent } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Empty payload is not allowed' });
    }
    if (rent === undefined){
        return res.status(400).json({ error: 'Rent cannot be undefined' });
    }
    if (rent <= 0) {
        return res.status(400).json({ error: 'Invalid rent provided' });
    }

    try {
        db.updateProperty(req.params.id, req.body);
        res.status(200).send('Property updated');
    } catch (error) {
        res.status(404).json({ error: 'Invalid property ID' });
    }
});

app.delete(PROPERTY_ENDPOINT+':id', (req, res) => {
    try {
        db.deleteProperty(req.params.id);
        res.status(200).send('Property deleted');
    } catch (error) {
        res.status(404).json({ error: 'Invalid property ID' });
    }
});

// Tenants Endpoints
app.get(TENANTS_ENDPOINT, (req, res) => {
    res.status(200).json(db.findAllTenants());
});

app.post(TENANTS_ENDPOINT, (req, res) => {
    const { name, email, phone, property_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Empty payload is not allowed' });
    }

    if (email && !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (phone && !phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }

    try {
        const id = db.insertTenant({ name, email, phone, property_id });
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: 'Malformed tenant data' });
    }
});

app.get(TENANT_ENDPOINT+':id', (req, res) => {
    const { id } = req.params;
    const tenant = db.findTenant(id);
    if (tenant) {
        res.status(200).json(tenant);
    } else {
        res.status(404).json({ error: 'Invalid tenant ID' });
    }
});

app.put(TENANT_ENDPOINT+':id', (req, res) => {
    const { name, email, phone, property_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Empty payload is not allowed' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }
    try {
        db.updateTenant(req.params.id, req.body);
        res.status(200).send('Tenant updated');
    } catch (error) {
        res.status(404).json({ error: 'Invalid tenant ID' });
    }
});

app.delete(TENANT_ENDPOINT+':id', (req, res) => {
    try {
        db.deleteTenant(req.params.id);
        res.status(200).send('Tenant deleted');
    } catch (error) {
        res.status(404).json({ error: 'Invalid tenant ID' });
    }
});

module.exports = app;
