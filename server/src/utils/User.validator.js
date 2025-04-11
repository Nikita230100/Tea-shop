class UserValidator {
  static validate({ name, email, password }) {
    if (
      !name ||
      !email ||
      !password ||
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: 'Пользователь не может содержать пустых полей',
      };
    }

    if (!this.validateMail(email)) {
      return {
        isValid: false,
        error: 'Неподдерживаемый формат почты',
      };
    }

    if (!this.validatePasswor(password)) {
      return {
        isValid: false,
        error: `Неподдерживаемый формат пароля. 
          Пароль должен быть не менее 8 символов, содержать: 1 заглавную букву, 1 маленьку,
          1 цифру, 1 спецсимвол, только на латинице`,
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateMail(email) {
    const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return mailPattern.test(email); // * t / f
  }

  static validatePasswor(password) {
    // Регулярные выражения для проверки требований к паролю
    const hasUpperCase = /[A-Z]/; // Проверка на наличие заглавной буквы
    const hasLowerCase = /[a-z]/; // Проверка на наличие строчной буквы
    const hasNumbers = /\d/; // Проверка на наличие цифры
    // const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/; // Проверка на наличие спецсимвола
    const isValidLength = password.length >= 8; // Проверка на минимальную длину

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !isValidLength
    ) {
      return false;
    }
    return true;
  }
}

module.exports = UserValidator;
