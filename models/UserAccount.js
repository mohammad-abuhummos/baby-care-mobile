import {isPresent, isValidEmail, isMatching} from './helpers';

export default class UserAccount {
  constructor(
    email,
    first_name,
    last_name,
    phone,
    password,
    password_confirmation,
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }

  isValid() {
    return this.errors().length === 0;
  }

  errors() {
    let errors_arr = [];
    if (!isValidEmail(this.email)) errors_arr.push('Invalid email');
    if (!isPresent(this.first_name))
      errors_arr.push('First name must be present');
    if (!isPresent(this.last_name))
      errors_arr.push('Last name must be present');
    if (!isPresent(this.phone)) errors_arr.push('Phone number must be present');
    if (!isMatching(this.password, this.password_confirmation))
      errors_arr.push('Password is not valid');
    return errors_arr;
  }

  toRequestObject() {
    return {
      user: {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        password: this.password,
        password_confirmation: this.password_confirmation,
      },
    };
  }
}
