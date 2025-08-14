export const reportAbuse = async (req, res) => {
  // For MVP, we just log it; in production save to DB & alert admins
  console.log('Abuse report:', {
    by: req.user?._id,
    payload: req.body
  });
  res.json({ message: 'Report received' });
};
