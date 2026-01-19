export const honeypot = (req, res, next) => {
  if (req.body?.company || req.body?.website) {
    return res.status(200).json({ success: true }); // silently drop bots
  }
  next();
};