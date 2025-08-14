import User from '../models/User.js';
import Item from '../models/Item.js';
import Claim from '../models/Claim.js';

export const dashboard = async (req, res) => {
  const [pendingClaims, activeItems, users] = await Promise.all([
    Claim.countDocuments({ status: 'pending' }),
    Item.countDocuments({ status: 'active' }),
    User.countDocuments()
  ]);
  res.json({ pendingClaims, activeItems, users });
};

export const blockUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.blocked = true;
  await user.save();
  res.json({ message: 'User blocked' });
};
