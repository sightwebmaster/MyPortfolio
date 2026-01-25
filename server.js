import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';


const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sgMail.send({
      to: 'ahmed.benchaaben@etudiant.enit-utm.tn',
      from: 'ahmed.benchaaben@etudiant.enit-utm.tn',
      subject: `Portfolio Contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));