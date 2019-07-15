const factoryManager = require('./test/factories/factory');

// Delete records in tables after each test
afterAll(async () => {
  await factoryManager.default.cleanUp();
});
