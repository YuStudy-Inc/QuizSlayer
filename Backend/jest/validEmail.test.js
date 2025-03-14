const validEmail = require('./validEmail.js');

test('Test asdf@gmail.com -> true', () => {
  expect(validEmail('asdf@gmail.com')).toBe(true);
});

test('Test asdfgmail.com -> false', () => {
  expect(validEmail('asdfgmail.com')).toBe(false);
});

test('Test asdf@gmailcom. -> false', () => {
  expect(validEmail('asdf@gmailcom.')).toBe(false);
});