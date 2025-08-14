import Item from '../models/Item.js';
import Claim from '../models/Claim.js';

export const listItems = async (req, res) => {
  const { type, q, category, status } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (q) filter.$text = { $search: q };
  const items = await Item.find(filter).sort({ createdAt: -1 }).populate('postedBy', 'name email');
  res.json(items);
};

export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id).populate('postedBy', 'name email');
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

export const createItem = async (req, res) => {
  const payload = {
    ...req.body,
    postedBy: req.user._id,
    photoUrl: req.file?.path || req.body.photoUrl
  };
  const item = await Item.create(payload);
  res.status(201).json(item);
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (String(item.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed' });
  }
  item.status = status;
  await item.save();
  if (status === 'returned') {
    await Claim.updateMany({ itemId: item._id, status: 'approved' }, { $set: { status: 'closed' } });
  }
  res.json(item);
};
