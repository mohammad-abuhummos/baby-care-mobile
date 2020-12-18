import {isPresent, isValidEmail, isMatching} from './helpers';

export default class UserSignUp {
  constructor(
    email,
    password,
    password_confirmation,
  ) {
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }

  isValid() {
    return this.errors().length === 0;
  }

  errors() {
    let errors_arr = [];
    if (!isValidEmail(this.email)) errors_arr.push('Invalid email');
    if (!isMatching(this.password, this.password_confirmation))
      errors_arr.push('Password is not valid');
    return errors_arr;
  }

  toRequestObject() {
    return {
      user: {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      },
    };
  }
}
