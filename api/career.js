// api/mail/career.js
import { upload } from "./_utils/upload";
import { honeypot } from "./_utils/honeypot";
import { transporter } from "./_utils/mailer";
import { careerTemplate } from "./templates/career.template";

export const config = {
  api: { bodyParser: false }
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "certificates", maxCount: 1 }
  ])(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false });

    if (honeypot(req, res)) return;

    try {
      const attachments = [];

      if (req.files?.cv) {
        attachments.push({
          filename: req.files.cv[0].originalname,
          content: req.files.cv[0].buffer
        });
      }

      if (req.files?.certificates) {
        attachments.push({
          filename: req.files.certificates[0].originalname,
          content: req.files.certificates[0].buffer
        });
      }

      await transporter.sendMail({
        from: `"TWINKL Website" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Career Application – ${req.body.position}`,
        html: careerTemplate(req.body),
        attachments
      });

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false });
    }
  });
}