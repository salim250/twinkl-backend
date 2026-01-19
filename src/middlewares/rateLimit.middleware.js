import rateLimit from 'express-rate-limit';

export const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // max 5 requests per IP
  message: 'Too many requests. Please try again later.',
});