const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log('comming');
  const headerToken = req.header('x-auth-token');
  const token = headerToken && headerToken.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
}

const getToken = (user) => {
  console.log(user);
  const payload = {id: user};
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  auth,
  getToken
}