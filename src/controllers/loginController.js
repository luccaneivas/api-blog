const LoginService = require('../services/loginService');

const getByEmail = async (req, res, next) => {
  try {
    const response = await LoginService.getByEmail(req.body);

    if (response.error) return next(response.error);

    res.status(200).json({ token: response });
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

module.exports = {
  getByEmail,
};