const { postTenant, updateTenant, getTenant, getProperty, deleteProperty } = require('../utils/apiUtility');

describe("/tenants/{id} PUT endpoint", () => {
    it('should respond with success status code on sending correct id and complete tenant payload', async () => {
    });

    it('should update all of the tenant data correctly', async () => {
  
    });

    it('should respond with correct error status code and correct error message on sending empty tenant payload', async () => {

    });

    // Invalid values test cases 
    it('should respond with correct error status code and correct error message on sending invalid id value in the tenant payload', async () => {
    
    });

    // Missing keys test cases 
    it('should respond with correct error status code and correct error message on sending missing id key in the tenant payload', async () => {
   
    });

    it('should respond with correct error status code and correct error message on sending missing name key in the tenant payload', async () => {
     
    });

    it('should respond with correct error status code and correct error message on sending missing email key in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending missing phone key in the tenant payload', async () => {
     
    });

    it('should respond with correct error status code and correct error message on sending missing property_id key in the tenant payload', async () => {
      
    });

    // Empty values test cases 
    it('should respond with correct error status code and correct error message on sending empty id value in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending empty name value in the tenant payload', async () => {
      
    });

    it('should respond with correct error status code and correct error message on sending empty email value in the tenant payload', async () => {
    });

    // Null values test cases 
    it('should respond with correct error status code and correct error message on sending null id value in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending null name value in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending null email value in the tenant payload', async () => {

    });

    it('should respond with correct error status code and correct error message on sending null phone value in the tenant payload', async () => {
 
    });

    it('should respond with correct error status code and correct error message on sending null property_id value in the tenant payload', async () => {
   
    });

    // Undefined values test cases 
    it('should respond with correct error status code and correct error message on sending undefined id value in the tenant payload', async () => {
     
    });

    it('should respond with correct error status code and correct error message on sending undefined name value in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending undefined email value in the tenant payload', async () => {
     
    });

    it('should respond with correct error status code and correct error message on sending undefined phone value in the tenant payload', async () => {
    
    });

    it('should respond with correct error status code and correct error message on sending undefined property_id value in the property payload', async () => {
    
    });
}
)