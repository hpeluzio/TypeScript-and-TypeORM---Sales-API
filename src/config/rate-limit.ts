import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 10, // limit each IP to 5 requests per windowMs
});
