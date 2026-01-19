import express from 'express';
import { transporter } from '../services/mail.service.js';
import { upload } from '../middlewares/upload.middleware.js';
import { mailLimiter } from '../middlewares/rateLimit.middleware.js';
import { honeypot } from '../middlewares/honeypot.middleware.js';
import { enrollmentTemplate } from '../templates/enrollment.template.js';
import { careerTemplate } from '../templates/career.template.js';

const router = express.Router();

/* ENROLLMENT */
router.post(
  '/enrollment',
  mailLimiter,
  upload.single('enrollment_file'),
  honeypot,
  async (req, res) => {
    try {
      await transporter.sendMail({
        from: `"TWINKL Website" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enrollment – ${req.body.student_name}`,
        html: enrollmentTemplate(req.body)
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
);

/* CAREER */
router.post(
  '/career',
  mailLimiter,
  honeypot,
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'certificates', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const attachments = [];

      if (req.files.cv) {
        attachments.push({
          filename: req.files.cv[0].originalname,
          content: req.files.cv[0].buffer,
        });
      }

      if (req.files.certificates) {
        attachments.push({
          filename: req.files.certificates[0].originalname,
          content: req.files.certificates[0].buffer,
        });
      }

      await transporter.sendMail({
        from: `"TWINKL Website" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Career Application – ${req.body.position}`,
        html: careerTemplate(req.body),
        attachments,
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      console.error(transporter);
      res.status(500).json({ success: false });
    }
  }
);

export default router;