const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 8;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value).trim());
}

export function isValidPhoneDigits(value) {
  const trimmed = String(value).trim();
  return /^[0-9]+$/.test(trimmed) && trimmed.length >= MIN_PHONE_DIGITS;
}

export const EMAIL_ERROR = "Please enter a valid email address.";
export const PHONE_ERROR = `Please enter a valid WhatsApp number (numbers only, at least ${MIN_PHONE_DIGITS} digits).`;
