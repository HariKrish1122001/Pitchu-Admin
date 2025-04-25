import CryptoJS from "crypto-js";
import config from "../../config/config";

var passphrase = config.SECRET_KEY;
const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    passphrase
  ).toString();

  return encrypted;
};

 const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

export  { encryptData, decryptData };