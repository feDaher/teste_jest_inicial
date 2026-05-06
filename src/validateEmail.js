function validateEmail(email) {
  if (typeof email !== 'string') {
    throw new Error('Deve ser string');
  }

  const emailTrim = email.trim();

  if (!emailTrim) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(emailTrim);
}

module.exports = validateEmail;
