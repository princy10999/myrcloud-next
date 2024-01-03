import CryptoJS from "crypto-js";

const ENC_KEY: string = process.env.ENC_KEY || "3er#B8K";

export const getRandomKey = (length: number = 128 / 8) => {
  var salt = CryptoJS.lib.WordArray.random(length);
  return salt.toString();
};
export const getIVKey = (date?: Date) => {
  var currentDate = date || new Date();
  var IVKey =
    (currentDate.getUTCDate() < 10
      ? "0" + currentDate.getUTCDate().toString()
      : currentDate.getUTCDate().toString()) +
    (currentDate.getUTCMonth() + 1 < 10
      ? "0" + (currentDate.getUTCMonth() + 1).toString()
      : currentDate.getUTCMonth() + 1) +
    currentDate.getUTCFullYear() +
    "-" +
    ENC_KEY;
  return IVKey;
};
export const getISTIVKey = (timeOffset: number = 330) => {
  var currentDate = new Date();
  currentDate.setTime(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000
  );
  currentDate.setTime(currentDate.getTime() + timeOffset * 60 * 1000);
  var IVKey =
    (currentDate.getDate() < 10
      ? "0" + currentDate.getDate().toString()
      : currentDate.getDate().toString()) +
    (currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1) +
    currentDate.getFullYear() +
    "-" +
    ENC_KEY;
  return IVKey;
};
export const encryptText = (text: string, aesKey?: string, IVkey?: string) => {
  var randomKey = aesKey || getRandomKey();
  var key = CryptoJS.enc.Base64.parse(randomKey);
  var iv = CryptoJS.enc.Utf8.parse(IVkey || getIVKey());
  var encryptedText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return { input: encryptedText.toString(), syncVal: randomKey };
};
export const decryptText = (
  encryptedText: string,
  aesKey?: string,
  IVkey?: string
) => {
  var randomKey = aesKey || getRandomKey();
  var key = CryptoJS.enc.Utf8.parse(randomKey);
  var iv = CryptoJS.enc.Utf8.parse(IVkey || getIVKey());
  var decryptedText = CryptoJS.AES.decrypt(encryptedText, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
