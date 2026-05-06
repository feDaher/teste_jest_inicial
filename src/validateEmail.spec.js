const validateEmail = require('./validateEmail');

describe('validateEmail', () => {
  it('deve validar email correto', () => {
    expect(validateEmail('teste@email.com')).toBe(true);
  });

  it('deve invalidar email sem @', () => {
    expect(validateEmail('testeemail.com')).toBe(false);
  });

  it('deve invalidar string vazia', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('deve aceitar espaços e tratar corretamente', () => {
    expect(validateEmail('  teste@email.com  ')).toBe(true);
  });

  it('deve lançar erro se não for string', () => {
    expect(() => validateEmail(123)).toThrow();
  });
});
