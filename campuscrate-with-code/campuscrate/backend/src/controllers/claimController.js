import Claim from '../models/Claim.js';
import Item from '../models/Item.js';

export const createClaim = async (req, res) => {
  const { itemId, message, answer } = req.body;
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (String(item.postedBy) === String(req.user._id))
    return res.status(400).json({ message: 'Cannot claim your own post' });
  const claim = await Claim.create({ itemId, claimantId: req.user._id, message, answer });
  res.status(201).json(claim);
};

export const listClaimsForItem = async (req, res) => {
  const { itemId } = req.params;
  const claims = await Claim.find({ itemId }).populate('claimantId', 'name email');
  res.json(claims);
};

export const resolveClaim = async (req, res) => {
  const { claimId } = req.params;
  const { status } = req.body; // approved | rejected
  const claim = await Claim.findById(claimId).populate('itemId');
  if (!claim) return res.status(404).json({ message: 'Claim not found' });
  if (String(claim.itemId.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed' });
  }
  claim.status = status;
  await claim.save();
  if (status === 'approved') {
    claim.itemId.status = 'claimed';
    await claim.itemId.save();
  }
  res.json(claim);
};
