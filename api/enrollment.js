// api/mail/enrollment.js
import { upload } from "./_utils/upload";
import { honeypot } from "./_utils/honeypot";
import { transporter } from "./_utils/mailer";
import { enrollmentTemplate } from "./templates/enrollment.template";

export const config = {
  api: { bodyParser: false }
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  upload.single("enrollment_file")(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false });

    if (honeypot(req, res)) return;

    try {
      await transporter.sendMail({
        from: `"TWINKL Website" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enrollment – ${req.body.student_name}`,
        html: enrollmentTemplate(req.body)
      });

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false });
    }
  });
}