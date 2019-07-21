const factory = require('./test/factories/factory');

// Delete records in tables after each test
afterEach(async () => {
  await factory.default.cleanUp();
});
