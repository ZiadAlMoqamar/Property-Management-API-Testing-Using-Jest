const { BASE_URL, PROPERTIES_ENDPOINT, PROPERTY_ENDPOINT, TENANTS_ENDPOINT, TENANT_ENDPOINT } = require('../globals');
const supertest = require('supertest');
const api = supertest(BASE_URL);

async function getAllProperties() {
    const res = await api
        .get(PROPERTIES_ENDPOINT);
    return res;
}

async function postProperty(reqBody){
    const res = await api
        .POST(reqBody);
    return res;
}

async function getProperty(id){
    const endpointWithId = `${PROPERTY_ENDPOINT}${id}`;
    const res = await api
        .get(endpointWithId);
    return res;
}

async function updateProperty(id, reqBody) {
    const endpointWithId = `${PROPERTY_ENDPOINT}${id}`;
    const res = await api
      .put(endpointWithId)
      .send(reqBody);
    return res;
  }
  
  async function deleteProperty(id) {
    const endpointWithId = `${PROPERTY_ENDPOINT}${id}`;
    const res = await api
      .delete(endpointWithId);
    return res;
  }
  
  async function getAllTenants() {
    const res = await api
      .get(TENANTS_ENDPOINT);
    return res;
  }
  
  async function postTenant(reqBody) {
    const res = await api
      .post(TENANTS_ENDPOINT)
      .send(reqBody);
    return res;
  }
  
  async function getTenant(id) {
    const endpointWithId = `${TENANT_ENDPOINT}${id}`;
    const res = await api
      .get(endpointWithId);
    return res;
  }
  
  async function updateTenant(id, reqBody) {
    const endpointWithId = `${TENANT_ENDPOINT}${id}`;
    const res = await api
      .put(endpointWithId)
      .send(reqBody);
    return res;
  }
  
  async function deleteTenant(id) {
    const endpointWithId = `${TENANT_ENDPOINT}${id}`;
    const res = await api
      .delete(endpointWithId);
    return res;
  }

  module.exports ={
    getAllProperties,
    postProperty,
    getProperty,
    updateProperty,
    deleteProperty,
    getAllTenants,
    postTenant,
    updateTenant,
    deleteTenant
  }