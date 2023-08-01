import CryptoJS from "crypto-js";
const TokenSecret = import.meta.env.VITE_TOKEN_SECRET;

// Set the token in local storage
export const setToken = (token: string, tokenName: string) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, TokenSecret).toString();
  localStorage.setItem(tokenName, encryptedToken);
};

// Get the token from local storage
export const getToken = (tokenName: string) => {
  const encryptedToken = localStorage.getItem(tokenName);
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, TokenSecret);
    const token = bytes.toString(CryptoJS.enc.Utf8);
    return token;
  }
  return null;
};
