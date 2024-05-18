const { postTenant, getTenant, deleteTenant, postProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/{id} GET endpoint", () => {
    it('should respond with success status code on sending correct id', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "456 Olaya St",
            "rent": 1500,
            "is_available": false
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "property_id": propertyId
        };
        // Act
        const postResponse = await postTenant(tenantReqBody);
        const getResponse = await getTenant(postResponse.body.id);

        //Assert
        expect(getResponse.statusCode).toBe(200);

        //Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with correct posted tenant id on sending valid id', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "486 Olaya St",
            "rent": 1700,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "property_id": propertyId
        };

        // Act
        const postResponse = await postTenant(tenantReqBody);
        const getResponse = await getTenant(postResponse.body.id);

        // Assert
        expect(getResponse.body.id).toEqual(postResponse.body.id);

        // Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with correct values of the posted tenant', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "486 Olaya St",
            "rent": 1700,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "property_id": propertyId
        };

        // Act
        const postResponse = await postTenant(tenantReqBody);
        const getResponse = await getTenant(postResponse.body.id);

        // Assert
        expect(getResponse.body).toEqual(expect.objectContaining(tenantReqBody));

        // Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with correct types of the posted tenant values', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Main St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "0123456789",
            "property_id": propertyId
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
        const getResponse = await getTenant(postResponse.body.id)
        const tenant = getResponse.body;
    
        // Assert
        expect(typeof tenant.id).toBe('string');
        expect(typeof tenant.name).toBe('string');
        expect(typeof tenant.email).toBe('string');
        expect(typeof tenant.phone).toBe('string');
        expect(typeof tenant.property_id).toBe('string');
    
        // Teardown
        await deleteTenant(tenant.id);
        await deleteProperty(propertyId);
    });
    
    it('should respond with correct error status code and correct error message on sending incorrect id', async () => {
        // Arrange
        const incorrectId = 'incorrect-id';
    
        // Act
        const getResponse = await getTenant(incorrectId);
    
        // Assert
        expect(getResponse.statusCode).toBe(404);
        expect(getResponse.body.error).toBe('Invalid tenant ID');
    });

    it('should respond with correct error status code and correct error message on sending null id', async () => {
        // Arrange
        const nullId = null;
    
        // Act
        const getResponse = await getTenant(nullId);
    
        // Assert
        expect(getResponse.statusCode).toBe(404);
        expect(getResponse.body.error).toBe('Invalid tenant ID');
    });

    it('should respond with correct error status code and correct error message on sending undefined id', async () => {
        // Arrange
        const undefinedId = undefined;
    
        // Act
        const getResponse = await getTenant(undefinedId);
    
        // Assert
        expect(getResponse.statusCode).toBe(404);
        expect(getResponse.body.error).toBe('Invalid tenant ID');
    });
});