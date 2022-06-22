import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SEC_KEY = "This is a secret key for localstorage";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(key: string, value: any){
    // var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SEC_KEY).toString();
    // localStorage.setItem(key, encryptedData);
    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SEC_KEY).toString();
    localStorage.setItem(key, encryptedData);
  }

  getItem(key: string): any{
    var encryptedData = localStorage.getItem(key);
    if(encryptedData){
      // var decryptedData  = CryptoJS.AES.decrypt(encryptedData, SEC_KEY).toString();
      var decryptedData  = CryptoJS.AES.decrypt(encryptedData, SEC_KEY).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  removeItem(key: string){
    localStorage.removeItem(key);
  }
}
