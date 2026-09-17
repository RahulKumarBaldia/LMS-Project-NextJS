const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateSignup = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  if (!name || !email || !password || !confirmPassword) {
    return "All fields are required";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Invalid email";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Invalid email";
  }

  return null;
};
