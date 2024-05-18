const { postTenant, getTenant, deleteTenant, postProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/post endpoint", () => {
    //Positive scenarios
    it('should respond with success status code on sending valid tenant data', async () => {
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

    // Act
    const postResponse = await postTenant(tenantReqBody);

    // Assert
    expect(postResponse.statusCode).toBe(201);
    expect(postResponse.body.id).toBeDefined();

    // Teardown
    await deleteTenant(postResponse.body.id);
    await deleteProperty(propertyId);
    });

    it('should save the sent data correctly', async () => {
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

    // Assert
    expect(getResponse.body).toEqual(expect.objectContaining(tenantReqBody));

    // Teardown
    await deleteTenant(postResponse.body.id);
    await deleteProperty(propertyId);
    })

    // Negative scenarios
    it('should respond with an error status code on sending empty tenant payload', async () => {
        //Arrange
        const reqBody = {};

        //Act
        const response = await postTenant(reqBody);

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Empty payload is not allowed");
    });

    // Assuming 400 Bad Request for missing key
    it('should respond with an error status code when \'name\' is missing', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property for tenant",
            "address": "456 Olaya St",
            "rent": 1500,
            "is_available": false
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "email": "no.name@example.com",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };

        // Act
        const postResponse = await postTenant(tenantReqBody);

        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Name is required");

        //Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with an error status code when \'email\' is missing', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Email is required");
    });
    
    it('should respond with an error status code when \'phone\' is missing', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Phone is required");
    });
    
    it('should respond with an error status code when \'property_id\' is missing', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Property ID is required");
    });
    
    it('should respond with an error status code and message when \'name\' is invalid', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "12345",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Invalid name format");
    });
    
    it('should respond with an error status code and message when \'email\' is invalid', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "not-an-email",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Invalid email format");
    });
    
    it('should respond with an error status code and message when \'phone\' is invalid', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "abcde12345",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Invalid phone number");
    });
    
    it('should respond with an error status code and message when \'property_id\' is invalid', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": "invalid-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Invalid property ID format");
    });
    
    it('should respond with an error status code and message when \'name\' is null', async () => {
        // Arrange
        const tenantReqBody = {
            "name": null,
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Name cannot be null");
    });
    
    it('should respond with an error status code and message when \'email\' is null', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": null,
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Email cannot be null");
    });
    
    it('should respond with an error status code and message when \'phone\' is null', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": null,
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Phone cannot be null");
    });
    
    it('should respond with an error status code and message when \'property_id\' is null', async () => {
        // Arrange
        const tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": null
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Property ID cannot be null");
    });
    
    it('should respond with an error status code and message when \'name\' is undefined', async () => {
        // Arrange
        let tenantReqBody = {
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
        delete tenantReqBody.name; // Simulate undefined 'name'
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Name is required");
    });
    
    it('should respond with an error status code and message when \'email\' is undefined', async () => {
        // Arrange
        let tenantReqBody = {
            "name": "John Doe",
            "email": undefined,
            "phone": "1234567890",
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Email is required");
    });
    
    it('should respond with an error status code and message when \'phone\' is undefined', async () => {
        // Arrange
        let tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": undefined,
            "property_id": "some-property-id"
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Phone is required");
    });

    it('should respond with an error status code and message when \'property_id\' is undefined', async () => {
        // Arrange
        let tenantReqBody = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "property_id": undefined
        };
    
        // Act
        const postResponse = await postTenant(tenantReqBody);
    
        // Assert
        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.error).toBe("Property ID is required");
    });
}
)