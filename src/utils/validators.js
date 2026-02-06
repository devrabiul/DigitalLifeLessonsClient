export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6) {
    errors.push("At least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("At least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("At least one lowercase letter");
  }
  return errors;
};
