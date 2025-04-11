const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const UserValidator = require('../utils/User.validator');

class AuthService {
  static async signUp(email, name, password) {
    const { isValid, error } = UserValidator.validate({ name, email, password });
    if (!isValid) throw new Error(error);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: await bcrypt.hash(password, 10) },
    });

    if (!created) throw new Error('User already exists');
    return user;
  }

  static async signIn(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Неверный логин или пароль');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Неверный логин или пароль');

    return user;
  }
}

module.exports = AuthService;