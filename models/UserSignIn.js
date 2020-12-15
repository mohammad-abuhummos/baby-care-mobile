import {isPresent, isValidEmail} from './helpers';

export default class UserSignIn {
  constructor(
    email,
    password,
  ) {
    this.email = email;
    this.password = password;
  }

  isValid() {
    return (
      isValidEmail(this.email) &&
      isPresent(this.password)
    );
  }

  errors() {
    let errors_arr = [];
    if (!isValidEmail(this.email)) errors_arr.push('Invalid email');
    if (!isPresent(this.password))
      errors_arr.push('Password is not valid');
    return errors_arr;
  }

  toRequestObject() {
    return {
      user: {
        email: this.email,
        password: this.password
      },
    };
  }
}
