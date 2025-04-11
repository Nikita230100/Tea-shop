const tokenRouter = require('express').Router();

const cookieConfig = require('../configs/cookieConfig');
const { verifyRefreshToken } = require('../middlewares/verifyToken');

const generateTokens = require('../utils/generateTokens');
tokenRouter.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  return res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ user: res.locals.user, accessToken });
});
module.exports = tokenRouter;