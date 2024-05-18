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
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code when \'phone\' is missing', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code when \'property_id\' is missing', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'name\' is invalid', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'email\' is invalid', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'phone\' is invalid', async () => {
        throw new Error('Not implemented yet');
    });


    it('should respond with an error status code and message when \'property_id\' is invalid', async () => {
        throw new Error('Not implemented yet');
    });


    it('should respond with an error status code and message when \'name\' is null', async () => {
        throw new Error('Not implemented yet');
    });


    it('should respond with an error status code and message when \'email\' is null', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'phone\' is null', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'property_id\' is null', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'name\' is null', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'email\' is undefined', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'phone\' is undefined', async () => {
        throw new Error('Not implemented yet');
    });

    it('should respond with an error status code and message when \'property_id\' is undefined', async () => {
        throw new Error('Not implemented yet');
    });
}
)