// api/mail/_utils/honeypot.js
export function honeypot(req, res) {
  if (req.body?.company || req.body?.website) {
    res.status(200).json({ success: true });
    return true;
  }
  return false;
}