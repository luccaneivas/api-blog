const validateToken = require('../helpers/validateToken');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return next({ status: 'unauthorized', message: 'Token not found' });
  }

  try {
    const decoded = validateToken(token);

    req.user = decoded.data;
  
    next();
  } catch (error) {
    return next({ status: 'unauthorized', message: 'Expired or invalid token' });
  }
};