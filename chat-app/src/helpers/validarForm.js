export const validarForm = (email, password, name) => {
  if (email.length > 0 && password.length > 0 && name.length > 0) {
    return true;
  } else {
    return false;
  }
};
