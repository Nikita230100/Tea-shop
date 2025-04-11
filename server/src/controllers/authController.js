const AuthService = require('../service/authService');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

class AuthController {
  static async signUp(req, res) {
    try {
      const { email, name, password } = req.body;
      const user = await AuthService.signUp(email, name, password);

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });

    } catch (error) {
      console.log('Signup error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.signIn(email, password);

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });

    } catch (error) {
      console.log('Signin error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static logout(req, res) {
    res.clearCookie('refreshToken').sendStatus(200);
  }
}

module.exports = AuthController;