import dayjs from 'dayjs';
import React from 'react';
import {Alert} from 'react-native';
export function isPresent(val) {
  return !!val;
}

export function isPresentIn(val, options) {
  return options.includes(val);
}

const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export function isValidEmail(val) {
  return isPresent(val) && emailformat.test(val);
}

export function isMatching(val_1, val_2) {
  return isPresent(val_1) && isPresent(val_2) && val_1 === val_2;
}

export function isPasword(val_1) {
  return  String(val_1).length >=6;
}

export function isName(val_1) {
  console.log('val_1.length', isPresent(String(val_1)));
  return (
    isPresent(String(val_1)) &&
    String(val_1).length > 3 &&
    String(val_1).length < 12
  );
}

export function isPhone(val_1) {
  return isPresent(String(val_1)) && String(val_1).length === 10;
}

export function collectionRequestObjects(collection) {
  return collection.map((item) => {
    return item.toRequestObject();
  });
}

export function parseDate(date) {
  return date;
}

export function displayError(title, body = null) {
  Alert.alert(title, body);
}

export function ConvertUnixToDate(date) {
  return dayjs.unix(date).toISOString();
}