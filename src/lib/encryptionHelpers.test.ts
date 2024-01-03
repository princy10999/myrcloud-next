import {describe, expect, test} from '@jest/globals';
import {encryptText,getIVKey,getRandomKey} from './encryptionHelpers';

describe('encryption module', () => {
  
  // test('check getIVKey', () => {
  //   expect(getIVKey()).toBe("12092022-3er#B8K");
  // });
  // test('check encryptText', () => {
  //   const text = "test1@rcloud.com";
  //   const aesKey = "b00EqeJmPbkv5dUaQ667207wPs612VVLclLUAGH1P0E=";
  //   const IVkey = getIVKey();
  //   const expected = "QNHm5ylYr6iPnnUwJsZppYo97okskk8p+oB6D3kuaPA=";
  //   const enc = encryptText(text,aesKey,IVkey);
  //   console.log(enc)
  //   expect(enc.input).toBe(expected);
  // });
  test('check encryptText', () => {
    const text = "Test@123";
    const enc = encryptText(text);
    console.log(enc)
  });
});