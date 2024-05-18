const { postTenant, updateTenant, deleteTenant, getTenant, postProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/{id} PUT endpoint", () => {
    it('should respond with success status code on sending correct id and complete tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "phone": "3426326734",
            "property_id": "updated-id"
        }
        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(200);

        // Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should update all of the tenant data correctly', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "phone": "3426326734",
            "property_id": "updated-id"
        }
        // Act
        await updateTenant(tenantId, reqBody);
        const getResponse = await getTenant(tenantId);
        // Assert
        expect(getResponse.body).toEqual(expect.objectContaining(reqBody));

        // Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending empty tenant payload', async () => {
        // Arrange
        const reqBody = {};
        const property = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        })
        // Act
        const updateResponse = await updateTenant(postResponse.body.id, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Empty payload is not allowed");

        // Teardown
        await deleteProperty(propertyId);
    });

    // Invalid values test cases 
    it('should respond with correct error status code and correct error message on sending invalid id value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const invalidId = 'invalid-id';
        const reqBody = {
            "id": invalidId,
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "phone": "3426326734",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(invalidId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.error).toBe("Invalid tenant ID");

        // Teardown
        await deleteTenant(postResponse.body.id);
        await deleteProperty(propertyId);
    });

    // Missing keys test cases 
    it('should respond with correct error status code and correct error message on sending missing id key in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "phone": "3426326734",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("ID is required");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing name key in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "email": "john.doe22@example.com",
            "phone": "3426326734",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name key is required");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing email key in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "Edited John Doe",
            "phone": "3426326734",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Missing email key");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing phone key in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Missing phone key");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing property_id key in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };
        const postResponse = await postTenant(tenantReqBody);
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "Edited John Doe",
            "email": "john.doe22@example.com",
            "phone": "3426326734",
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Missing property_id key");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    // Empty values test cases 
    it('should respond with correct error status code and correct error message on sending empty name value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "name": "John Doe",
            "email": "fweg@gfsd.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const reqBody = {
            "name": "",
            "email": "fdsg@fgsd.com",
            "phone": "1234567890",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name cannot be empty");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending empty email value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "name": "John Doe",
            "email": "fweg@gfsd.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "John Doe",
            "email": "",
            "phone": "1234567890",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Invalid email format");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending empty email value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "name": "John Doe",
            "email": "fweg@gfsd.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": tenantId,
            "name": "John Doe",
            "email": "fdsg@fgds.com",
            "phone": "",
            "property_id": propertyId
        };

        // Act
        const updateResponse = await updateTenant(tenantId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Invalid phone number");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    // Null values test cases
    it('should respond with correct error status code and correct error message on sending null tenant id value in the tenant payload', async () => {
        // Arrange

        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const reqBody = {
            "id": null,
            "name": "Edited John Doe",
            "email": "john.doe2@example.com",
            "phone": "4234567890",
            "property_id": propertyId
        };
        // Act
        const updateResponse = await updateTenant(null, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Tenant ID cannot be null");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null name value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "id": propertyId,
            "name": "tenant d",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const ReqBody = {
            "id": propertyId,
            "name": null,
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };


        // Act
        const updateResponse = await updateTenant(tenantId, ReqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name cannot be null");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null email value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "id": propertyId,
            "name": "tenant d",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const ReqBody = {
            "id": propertyId,
            "name": "tenant r",
            "email": null,
            "phone": "1234567890",
            "property_id": propertyId
        };


        // Act
        const updateResponse = await updateTenant(tenantId, ReqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Email cannot be null");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null phone value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "id": propertyId,
            "name": "tenant d",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const ReqBody = {
            "id": propertyId,
            "name": "tenant r",
            "email": "john.doe@example.com",
            "phone": null,
            "property_id": propertyId
        };


        // Act
        const updateResponse = await updateTenant(tenantId, ReqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Phone cannot be null");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null property_id value in the tenant payload', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const postResponse = await postTenant({
            "id": propertyId,
            "name": "tenant d",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        });
        const tenantId = postResponse.body.id;
        const ReqBody = {
            "id": propertyId,
            "name": "tenant r",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": null
        };


        // Act
        const updateResponse = await updateTenant(tenantId, ReqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Property ID cannot be null");

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    // Undefined values test cases
    it('should respond with correct error status code and correct error message on sending undefined id value in the tenant payload', async () => {
        throw Error('Not implemented yet');
    });

    it('should respond with correct error status code and correct error message on sending undefined name value in the tenant payload', async () => {
        throw Error('Not implemented yet');
    });

    it('should respond with correct error status code and correct error message on sending undefined email value in the tenant payload', async () => {
        throw Error('Not implemented yet');
    });

    it('should respond with correct error status code and correct error message on sending undefined phone value in the tenant payload', async () => {
        throw Error('Not implemented yet');
    });

    it('should respond with correct error status code and correct error message on sending undefined property_id value in the property payload', async () => {
        throw Error('Not implemented yet');
    });

}
)