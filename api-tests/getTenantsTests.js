const { getAllTenants, postTenant, deleteTenant, postProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/get endpoint", () => {

    it('should respond with success status code', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property 1",
            "address": "123 Olaya St",
            "rent": 1200,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "tenant 1",
            "email": "tenant1@example.com",
            "phone": "1234567890",
            "property_id": propertyId
        };

        // Act
        const tenantPostResponse = await postTenant(tenantReqBody);
        const getAllTenantsResponse = await getAllTenants();

        // Assert
        expect(getAllTenantsResponse.statusCode).toBe(200);

        // Teardown
        await deleteTenant(tenantPostResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with array of tenants', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property 2",
            "address": "456 Olaya St",
            "rent": 1500,
            "is_available": false
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "tenant 2",
            "email": "tenant2@example.com",
            "phone": "0987654321",
            "property_id": propertyId
        };

        // Act
        const tenantPostResponse = await postTenant(tenantReqBody);
        const getAllTenantsResponse = await getAllTenants();

        // Assert
        expect(Array.isArray(getAllTenantsResponse.body)).toBe(true);

        // Teardown
        await deleteTenant(tenantPostResponse.body.id);
        await deleteProperty(propertyId);
    });

    it('should respond with correct values of the posted tenants', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property 3",
            "address": "789 Olaya St",
            "rent": 2000,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "tenant 3",
            "email": "tenant3@example.com",
            "phone": "1122334455",
            "property_id": propertyId
        };

        // Act
        const tenantPostResponse = await postTenant(tenantReqBody);
        const tenantId = tenantPostResponse.body.id;
        const getAllTenantsResponse = await getAllTenants();

        // Assert
        const postedTenant = getAllTenantsResponse.body.find(t => t.id === tenantId);
        expect(postedTenant.id).toBeDefined();
        expect(postedTenant).toEqual(expect.objectContaining(tenantReqBody));

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with correct types of tenant values', async () => {
        // Arrange
        const property = await postProperty({
            "name": "property 4",
            "address": "1010 Olaya St",
            "rent": 2500,
            "is_available": true
        });
        const propertyId = property.body.id;
        const tenantReqBody = {
            "name": "tenant 4",
            "email": "tenant4@example.com",
            "phone": "5566778899",
            "property_id": propertyId
        };

        // Act
        const tenantPostResponse = await postTenant(tenantReqBody);
        const tenantId = tenantPostResponse.body.id;
        const getAllTenantsResponse = await getAllTenants();

        // Assert
        const postedTenant = getAllTenantsResponse.body.find(t => t.id === tenantId);
        expect(typeof postedTenant.id).toBe('string');
        expect(typeof postedTenant.name).toBe('string');
        expect(typeof postedTenant.email).toBe('string');
        expect(typeof postedTenant.phone).toBe('string');
        expect(typeof postedTenant.property_id).toBe('string');

        // Teardown
        await deleteTenant(tenantId);
        await deleteProperty(propertyId);
    });

    it('should respond with the correct count of tenants', async () => {
        // Arrange
        const property1 = await postProperty({
            "name": "property 5",
            "address": "789 Olaya St",
            "rent": 1800,
            "is_available": true
        });
        const property2 = await postProperty({
            "name": "property 6",
            "address": "101 Maple St",
            "rent": 2100,
            "is_available": false
        });
        const tenant1 = await postTenant({
            "name": "tenant 5",
            "email": "tenant5@example.com",
            "phone": "1231231234",
            "property_id": property1.body.id
        });
        const tenant2 = await postTenant({
            "name": "tenant 6",
            "email": "tenant6@example.com",
            "phone": "3213214321",
            "property_id": property2.body.id
        });

        // Act
        const getAllTenantsResponse = await getAllTenants();

        // Assert
        expect(getAllTenantsResponse.body.length).toBe(2);

        // Teardown
        await deleteTenant(tenant1.body.id);
        await deleteTenant(tenant2.body.id);
        await deleteProperty(property1.body.id);
        await deleteProperty(property2.body.id);
    });
});