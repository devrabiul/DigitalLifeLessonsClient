export const validatePassword = (password) => {
  const errors = [];

  if (!/[A-Z]/.test(password)) errors.push("Must have uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Must have lowercase letter");
  if (password.length < 6) errors.push("Must be at least 6 characters");

  return errors;
};
