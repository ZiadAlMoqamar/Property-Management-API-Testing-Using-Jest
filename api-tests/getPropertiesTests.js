const { getAllProperties, postProperty, deleteProperty } = require('../utils/apiUtility');

describe("/properties/get endpoint", () => {
    it('should respond with success status code', async () => {
        //Arrange
        const reqBody = {
            "name": "property 1",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const getAllResponse = await getAllProperties();

        //Assert
        expect(getAllResponse.statusCode).toBe(200);

        //Teardown
        const propertyId = postResponse.body.id;
        await deleteProperty(propertyId);
    });

    it('should respond with array of properties', async () => {
        //Arrange
        const reqBody = {
            "name": "property 2",
            "address": "456 Olaya St",
            "rent": 1500,
            "is_available": false
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const getAllResponse = await getAllProperties();

        //Assert
        //Assuming the response body is a JSON array having all posted properties
        expect(Array.isArray(getAllResponse.body)).toBe(true);

        //Teardown
        const propertyId = postResponse.body.id;
        await deleteProperty(propertyId);
    });

    // Test case for correct values of the posted properties
    it('should respond with correct values of the posted properties', async () => {
        //Arrange
        const reqBody = {
            "name": "property 3",
            "address": "789 Olaya St",
            "rent": 2000,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getAllResponse = await getAllProperties();

        //Assert
        const postedProperty = getAllResponse.body.find(p => p.id === propertyId);
        expect(postedProperty.id).toBeDefined();
        expect(postedProperty).toEqual(expect.objectContaining(reqBody));

        //Teardown
        await deleteProperty(propertyId);
    });

    // Test case for types of property values
    it('should respond with types of property values', async () => {
        //Arrange
        const reqBody = {
            "name": "property 4",
            "address": "1010 Olaya St",
            "rent": 2500,
            "is_available": true
        };

        //Act
        const postResponse = await postProperty(reqBody);
        const propertyId = postResponse.body.id;
        const getAllResponse = await getAllProperties();

        //Assert
        const postedProperty = getAllResponse.body.find(p => p.id === propertyId);
        expect(typeof postedProperty.id).toBe('string');
        expect(typeof postedProperty.name).toBe('string');
        expect(typeof postedProperty.address).toBe('string');
        expect(typeof postedProperty.rent).toBe('number');
        expect(typeof postedProperty.is_available).toBe('boolean');

        //Teardown
        await deleteProperty(propertyId);
    });

    // Test case for posted properties count
    it('should respond with the correct number of properties', async () => {
        //Arrange
        const property1 = {
            "name": "property 5",
            "address": "789 Olaya St",
            "rent": 1800,
            "is_available": true
        };
        const property2 = {
            "name": "property 6",
            "address": "101 Maple St",
            "rent": 2100,
            "is_available": false
        };

        //Act
        const postResponse1 = await postProperty(property1);
        const postResponse2 = await postProperty(property2);
        const getAllResponse = await getAllProperties();

        //Assert
        expect(getAllResponse.body.length).toBe(2);

        //Teardown
        await deleteProperty(postResponse1.body.id);
        await deleteProperty(postResponse2.body.id);
    });

}
)