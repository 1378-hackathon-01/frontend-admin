function isValidPassword(password: string): boolean {
  return password.trim().length > 3;
}

export default isValidPassword;
