const { postProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/properties/{id} GET endpoint", () => {
    it('should respond with success status code on sending correct id', async () => {
        //Arrange
        const reqBody = {
            "name": "property 7",
            "address": "1234 Olaya St",
            "rent": 3000,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getResponse = await getProperty(propertyId);

        //Assert
        expect(getResponse.statusCode).toBe(200);

        //Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct posted property id on sending valid id', async () => {
        //Arrange
        const reqBody = {
            "name": "property 8",
            "address": "5678 Olaya St",
            "rent": 3500,
            "is_available": false
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getResponse = await getProperty(propertyId);

        //Assert
        expect(getResponse.body.id).toEqual(propertyId);

        //Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct values of the posted property', async () => {
        //Arrange
        const reqBody = {
            "name": "property 9",
            "address": "91011 Olaya St",
            "rent": 4000,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getResponse = await getProperty(propertyId);

        //Assert
        expect(getResponse.body.name).toBe(reqBody.name);
        expect(getResponse.body.address).toBe(reqBody.address);
        expect(getResponse.body.rent).toBe(reqBody.rent);
        expect(getResponse.body.is_available).toBe(reqBody.is_available);

        //Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct types of the posted property values', async () => {
        //Arrange
        const reqBody = {
            "name": "property 10",
            "address": "1213 Olaya St",
            "rent": 4500,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getResponse = await getProperty(propertyId);

        //Assert
        expect(typeof getResponse.body.id).toBe('string');
        expect(typeof getResponse.body.name).toBe('string');
        expect(typeof getResponse.body.address).toBe('string');
        expect(typeof getResponse.body.rent).toBe('number');
        expect(typeof getResponse.body.is_available).toBe('boolean');

        //Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending incorrect id', async () => {
        //Arrange
        const incorrectId = 'wrongid';

        //Act
        const getResponse = await getProperty(incorrectId);

        //Assert
        expect(getResponse.statusCode).toBe(404);
        expect(getResponse.body.error).toBe("Property not found");
    });

    it('should respond with correct error status code and correct error message on sending empty id', async () => {
        //Arrange
        const emptyId = '';

        //Act
        const getResponse = await getProperty(emptyId);

        //Assert
        expect(getResponse.statusCode).toBe(400);
        expect(getResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending null id', async () => {
        //Arrange
        const nullId = null;

        //Act
        const getResponse = await getProperty(nullId);

        //Assert
        expect(getResponse.statusCode).toBe(400);
        expect(getResponse.body.error).toBe("Property ID cannot be null");
    });

    it('should respond with correct error status code and correct error message on sending undefined id', async () => {
        //Arrange
        const undefinedId = undefined;

        //Act
        const getResponse = await getProperty(undefinedId);

        //Assert
        expect(getResponse.statusCode).toBe(400);
        expect(getResponse.body.error).toBe("Property ID is required");
    });
});