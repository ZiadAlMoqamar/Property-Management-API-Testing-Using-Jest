const { postProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/properties/get endpoint", () => {
    //Positive scenarios
    it('should respond with success status code on sending valid property data', async () => {
        //Arrange
        const reqBody = {
            "name": "property 1",
            "address": "134 Riyadh, SA",
            "rent": 5300.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(200);
        // Assuming it will respond with the property id on success.
        const propertyId = response.body.id;
        expect(propertyId).toBeDefined();
        //Teardown
        await deleteProperty(propertyId);
    });

    it('should save the sent data correctly', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const response = await getProperty(propertyId);
        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: propertyId,
            name: reqBody.name,
            address: reqBody.address,
            rent: reqBody.rent,
            is_available: reqBody.is_available
        }));
        //Teardown
        await deleteProperty(propertyId);
    })

    // Negative scenarios
    // Assuming 400 Bad Request for missing key

    it('should respond with an error status code when \'name\' is missing', async () => {
        //Arrange
        const reqBody = {
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name key is missed");
    });

    it('should respond with an error status code when \'address\' is missing', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("address key is missed");
    });

    it('should respond with an error status code when \'rent\' is missing', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("rent key is missed");
    });

    it('should respond with an error status code when \'is_available\' is missing', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 6234.5
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("is_available key is missed");
    });

    // Test case for invalid 'name' value
    it('should respond with an error status code and message when \'name\' is invalid', async () => {
        //Arrange
        const reqBody = {
            "name": "",
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid name provided");
    });

    // Test case for invalid 'address' value
    it('should respond with an error status code and message when \'address\' is invalid', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid address provided");
    });

    // Test cases for invalid 'rent' value
    it('should respond with an error status code and message when \'rent\' is negative value', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": -100,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid rent provided");
    });

    it('should respond with an error status code and message when \'rent\' is zero', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 0,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid rent provided");
    });

    // Test case for invalid 'is_available' value
    it('should respond with an error status code and message when \'is_available\' is invalid', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": "yes"
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid availability status provided");
    });

    // Test case for 'name' being null
    it('should respond with an error status code and message when \'name\' is null', async () => {
        //Arrange
        const reqBody = {
            "name": null,
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Name cannot be null");
    });

    // Test case for 'address' being null
    it('should respond with an error status code and message when \'address\' is null', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": null,
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Address cannot be null");
    });

    // Test case for 'rent' being null
    it('should respond with an error status code and message when \'rent\' is null', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "134 Riyadh, SA",
            "rent": null,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Rent cannot be null");
    });

    // Test case for 'is_available' being null
    it('should respond with an error status code and message when \'is_available\' is null', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": null
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Availability status cannot be null");
    });

    // Test case for 'name' being undefined
    it('should respond with an error status code and message when \'name\' is null', async () => {
        //Arrange
        const reqBody = {
            "name": undefined,
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Name cannot be undefined");
    });

    // Test case for 'address' being undefined
    it('should respond with an error status code and message when \'address\' is undefined', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": undefined,
            "rent": 6234.5,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Address cannot be undefined");
    });

    // Test case for 'rent' being undefined
    it('should respond with an error status code and message when \'rent\' is undefined', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": undefined,
            "is_available": true
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Rent cannot be undefined");
    });

    // Test case for 'is_available' being undefined
    it('should respond with an error status code and message when \'is_available\' is undefined', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "135 Riyadh, SA",
            "rent": 6234.5,
            "is_available": undefined
        };
        //Act
        const response = await postProperty(reqBody);
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Availability status cannot be undefined");
    });
}
)