const { getTenant, postTenant, deleteTenant, postProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/{id} DELETE endpoint", () => {
    it('should respond with success status code on sending correct id', async () => {
        // Arrange
        const tenant = await postTenant({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "0123456789",
            "property_id": "random"
        });
        const tenantId = tenant.body.id;

        // Act
        const deleteResponse = await deleteTenant(tenantId);

        // Assert
        expect(deleteResponse.statusCode).toBe(200);
    });

    it('should delete the requested tenant id', async () => {
        // Arrange
        const tenant = await postTenant({
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "9876543210",
            "property_id": "random"
        });
        const tenantId = tenant.body.id;

        // Act
        await deleteTenant(tenantId);
        const getResponse = await getTenant(tenantId);

        // Assert
        expect(getResponse.statusCode).toBe(404);
    });

    it('should respond with correct error status code and correct error message on sending incorrect id', async () => {
        // Arrange
        const incorrectId = 'incorrect-id';

        // Act
        const deleteResponse = await deleteTenant(incorrectId);

        // Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe('Invalid tenant ID');
    });


    it('should respond with correct error status code and correct error message on sending null id', async () => {
        // Arrange
        const nullId = null;

        // Act
        const deleteResponse = await deleteTenant(nullId);

        // Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe('Invalid tenant ID');
    });

    it('should respond with correct error status code and correct error message on sending undefined id', async () => {
        // Arrange
        let undefinedId;

        // Act
        const deleteResponse = await deleteTenant(undefinedId);

        // Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe('Invalid tenant ID');
    });
});