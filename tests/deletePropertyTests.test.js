const { postProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/properties/{id} DELETE endpoint", () => {
    it('should respond with success status code on sending correct id', async () => {
        //Arrange
        const reqBody = {
            "name": "property 11",
            "address": "1234 Olaya St",
            "rent": 3000,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const deleteResponse = await deleteProperty(propertyId);

        //Assert
        expect(deleteResponse.statusCode).toBe(200);
    });

    it('should delete the requested property id', async () => {
        //Arrange
        const reqBody = {
            "name": "property 12",
            "address": "5678 Olaya St",
            "rent": 3500,
            "is_available": false
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        await deleteProperty(propertyId);
        const getResponse = await getProperty(propertyId);

        //Assert
        expect(getResponse.statusCode).toBe(404);
    });

    it('should respond with correct error status code and correct error message on sending incorrect id', async () => {
        //Arrange
        const incorrectId = 'nonexistentId';

        //Act
        const deleteResponse = await deleteProperty(incorrectId);

        //Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending null id', async () => {
        //Arrange
        const nullId = null;

        //Act
        const deleteResponse = await deleteProperty(nullId);

        //Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending undefined id', async () => {
        //Arrange
        const undefinedId = undefined;

        //Act
        const deleteResponse = await deleteProperty(undefinedId);

        //Assert
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body.error).toBe("Invalid property ID");
    });
});