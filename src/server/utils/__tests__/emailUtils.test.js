const { sendConfirmationEmail, sendRecoveryEmail } = require('../emailUtils');

describe('Email Utilities', () => {
  test('should send confirmation email', async () => {
    const testFunction = () => {sendConfirmationEmail('janedoe@gmail.com', 'testConfirmToken')};
    expect(testFunction).not.toThrow();
    await expect(testFunction()).toBe(undefined);
  });

  test('should send recovery email', async () => {
    const testFunction = () => {sendRecoveryEmail('janedoe@gmail.com', 'testRecoverToken')};
    expect(testFunction).not.toThrow();
    await expect(testFunction()).toBe(undefined);
  });
});