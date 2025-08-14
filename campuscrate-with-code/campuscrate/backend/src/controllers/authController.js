import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/env.js';

const gen = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: gen(user._id), user: { id: user._id, name, email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({ token: gen(user._id), user: { id: user._id, name: user.name, email, role: user.role } });
};
