import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mailRoutes from './routes/mail.routes.js';

dotenv.config();
const app = express();

/* CORS CONFIG */
app.use(
  cors({
    origin: [
      process.env.DEPLOYMENT_URL,
      process.env.DOMAIN_URL,
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/* IMPORTANT: preflight support */
app.options('*', cors());
app.use(express.json());

app.use('/api/mail', mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Mail server running on port ${process.env.PORT}`);
});