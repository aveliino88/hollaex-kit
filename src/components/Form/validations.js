import validator from 'validator';
import WAValidator from 'wallet-address-validator';

export const required = (value) => !value ? 'Required field' : undefined;

export const email = (value) => !validator.isEmail(value) ? 'Invalid email' : undefined;

const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).{8,}$/;
const INVALID_PASSWORD = 'Invalid password. It has to contain at least 8 characters, a digit in the password and a special character.';

export const password = (value) => !passwordRegEx.test(value) ? INVALID_PASSWORD : undefined

export const validAddress = (symbol = '', message) => {
  const currency = symbol.toUpperCase();
  return (address) => {
    const valid = WAValidator.validate(address, currency, 'both');
    return !valid ? (message || `Invalid ${currency} address (${address})`) : undefined;
  }
}

export const minValue = (minValue, message) => (value) => value < minValue ? (message || `Value must be ${minValue} or higher.`) : undefined;
export const maxValue = (maxValue, message) => (value) => value > maxValue ? (message || `Value must be ${minValue} or lower.`) : undefined;

export const checkBalance = (available, message, fee = 0) => (value) => {
  const operation = value + value * fee;
  if (operation > available) {
    const errorMessage = (message || `Insufficient balance available (${available}) to perform the operation (${operation}).`);
    return errorMessage;
  }
  return undefined;
}
