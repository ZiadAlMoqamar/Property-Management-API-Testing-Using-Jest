const { postProperty, updateProperty, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/properties/{id} PUT endpoint", () => {
    it('should respond with success status code on sending correct id and complete property payload', async () => {
        //Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;

        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(200);

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should update all of the property data correctly', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;

        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        await updateProperty(propertyId, reqBody);
        const getResponse = await getProperty(propertyId);

        // Assert
        expect(getResponse.body).toEqual(expect.objectContaining(reqBody));

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending empty property payload', async () => {
        // Arrange
        const reqBody = {};
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Empty payload is not allowed");

        // Teardown
        await deleteProperty(propertyId);
    });

    // Invalid values test cases 
    it('should respond with correct error status code and correct error message on sending invalid id value in the property payload', async () => {
        // Arrange
        const invalidId = 'invalidId';
        const reqBody = {
            "id": invalidId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(invalidId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.error).toBe("Property with the specified ID does not exist");
    });

    it('should respond with correct error status code and correct error message on sending zero rent value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 0,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Rent cannot be zero");

        // Teardown
        await deleteProperty(propertyId);
    });


    it('should respond with correct error status code and correct error message on sending negative rent value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": -1000,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Rent cannot be negative");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending invalid is_available value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 1000,
            "is_available": "false"
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Invalid availability status provided");

        // Teardown
        await deleteProperty(propertyId);
    });

    // Missing keys test cases 
    it('should respond with correct error status code and correct error message on sending missing id key in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Id key is missing");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing name key in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name key is missing");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing address key in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "updated property",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Address key is missing");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing rent key in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "updated property",
            "address": "1234 Updated St",
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Rent key is missing");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending missing is_available key in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "updated property",
            "address": "1234 Updated St",
            "rent": 3200
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("is_available key is missing");

        // Teardown
        await deleteProperty(propertyId);
    });

    // Empty values test cases 
    it('should respond with correct error status code and correct error message on sending empty id value in the property payload', async () => {
        // Arrange
        const emptyId = '';
        const reqBody = {
            "id": emptyId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(emptyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending empty name value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name cannot be empty");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending empty address value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": "property updated",
            "address": "",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Address cannot be empty");

        // Teardown
        await deleteProperty(propertyId);
    });

    // Null values test cases 
    it('should respond with correct error status code and correct error message on sending null id value in the property payload', async () => {
        // Arrange
        const nullId = null;
        const reqBody = {
            "id": nullId,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(nullId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending null name value in the property payload', async () => {
        // Arrange
        const postResponse = await postProperty({
            "name": "property original",
            "address": "1234 Original St",
            "rent": 3000,
            "is_available": true
        });
        const propertyId = postResponse.body.id;
        const reqBody = {
            "id": propertyId,
            "name": null,
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(propertyId, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body.error).toBe("Name cannot be null");

        // Teardown
        await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null address value in the property payload', async () => {
      // Arrange
    const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": null,
        "rent": 3200,
        "is_available": false
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("Address cannot be null");

    // Teardown
    await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null rent value in the property payload', async () => {
      // Arrange
      const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": "1234 Updated St",
        "rent": null,
        "is_available": false
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("Rent cannot be null");

    // Teardown
    await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending null is_available value in the property payload', async () => {
      // Arrange
      const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": "1234 Updated St",
        "rent": 3200,
        "is_available": null
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("is_available cannot be null");

    // Teardown
    await deleteProperty(propertyId);
    });

    // Undefined values test cases 
    it('should respond with correct error status code and correct error message on sending undefined id value in the property payload', async () => {
        // Arrange
        const undefinedID = undefined;
        const reqBody = {
            "id": undefinedID,
            "name": "property updated",
            "address": "1234 Updated St",
            "rent": 3200,
            "is_available": false
        };

        // Act
        const updateResponse = await updateProperty(undefinedID, reqBody);

        // Assert
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.error).toBe("Invalid property ID");
    });

    it('should respond with correct error status code and correct error message on sending undefined name value in the property payload', async () => {
      // Arrange
    const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": undefined,
        "address": "1234 Updated St",
        "rent": 3200,
        "is_available": false
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("Name cannot be undefined");

    // Teardown
    await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending undefined address value in the property payload', async () => {
      // Arrange
      const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": undefined,
        "rent": 3200,
        "is_available": false
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("Address cannot be undefined");

    // Teardown
    await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending undefined rent value in the property payload', async () => {
      // Arrange
      const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": "1234 Updated St",
        "rent": undefined,
        "is_available": false
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("Rent cannot be undefined");

    // Teardown
    await deleteProperty(propertyId);
    });

    it('should respond with correct error status code and correct error message on sending undefined is_available value in the property payload', async () => {
      // Arrange
      const postResponse = await postProperty({
        "name": "property original",
        "address": "1234 Original St",
        "rent": 3000,
        "is_available": true
    });
    const propertyId = postResponse.body.id;
    const reqBody = {
        "id": propertyId,
        "name": "property updated",
        "address": "1234 Updated St",
        "rent": 3200,
        "is_available": undefined
    };

    // Act
    const updateResponse = await updateProperty(propertyId, reqBody);

    // Assert
    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body.error).toBe("is_available cannot be undefined");

    // Teardown
    await deleteProperty(propertyId);
    });
}
)