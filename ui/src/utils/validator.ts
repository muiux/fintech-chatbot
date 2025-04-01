export const nameValidator = (value: string) => {
  if (value.length < 3) return "Name must be at least 3 characters long";
  if (value.length > 20) return "Name must be less than 20 characters long";
  if (!/^[a-zA-Z ]+$/.test(value))
    return "Name must contain only letters and spaces";
  return false;
};

export const emailValidator = (value: string) => {
  if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
    return "Invalid email address";
  return false;
};

export const passwordValidator = (value: string) => {
  if (value.length < 6) return "Password must be at least 6 characters long";
  return false;
};

export const confirmPasswordValidator = (
  password: string,
  password2: string
) => {
  if (password !== password2) return "Password doesn't match";
  return false;
};
