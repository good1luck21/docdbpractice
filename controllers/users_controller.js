const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { getToken } = require('../utils/user_authentication');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  console.log(req.user);
  res.json(users);
}

const postUser = async (req, res) => {
  // const user = new User(req.body);
  // await user.save();
  // res.json(user);
  const { name, email, password } = req.body;

  console.log(name, email, password);

  if(!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  if(password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if(!email.includes('@')) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await new User({
    name,
    email,
    password: hashedPassword
  }).save();
  
  // const user = {_id: '123', name, email, password: hashedPassword}

  const userToken = getToken(user._id);

  const passwordCheck = await bcrypt.compare(password, user.password);

  console.log(passwordCheck);

  res.json({ user: user, token: userToken });
}

const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  console.log(email, password);

  if(!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ email: email });

  if(!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  console.log(user);

  const passwordCheck = await bcrypt.compare(password, user.password);

  if(!passwordCheck) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const userToken = getToken(user._id);

  res.json({ user: user, token: userToken });
}

module.exports = {
  getAllUsers,
  postUser,
  loginUser
}