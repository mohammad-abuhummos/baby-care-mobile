import {isName, isPhone} from './helpers';

export default class CompleteSignUp {
  constructor(firstname, lastname, phone) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
  }

  isValid() {
    return this.errors().length === 0;
  }

  errors() {
    let errors_arr = [];
    if (!isName(this.firstname))
      errors_arr.push(
        'First Name must be greater than 3 character and less than 12 character',
      );
    if (!isName(this.lastname))
      errors_arr.push(
        'Last Name must be greater than 3 character and less than 12 character',
      );
    if (!isPhone(this.phone))
      errors_arr.push('Phone Number must be 10 character');
    return errors_arr;
  }

  toRequestObject() {
    return {
      user: {
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
      },
    };
  }
}
