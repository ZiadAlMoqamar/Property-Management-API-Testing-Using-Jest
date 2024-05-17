# API Testing Guide

## Prerequisites

Before running the tests, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

## Configuration

**Set the Base URL:**
    Open the `globals.js` file located in the test directory and specify the base live URL for the API tests.

```
   // globals.js
   module.exports = {
     BASE_URL: 'YOUR_API_BASE_URL_HERE'
   };
   ```
**Running Tests Serially:**
    To run the tests serially, use the following command:
```
    npm run testserially
```