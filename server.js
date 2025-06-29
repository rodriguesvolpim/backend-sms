require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Configurações do Twilio usando variáveis de ambiente
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// Verifica se as variáveis de ambiente estão configuradas
if (!accountSid || !authToken || !twilioNumber) {
  console.error('Erro: Variáveis de ambiente do Twilio não configuradas!');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { contacts, message } = req.body;

  if (!contacts || !message) {
    return res.status(400).json({ error: 'Contatos e mensagem são obrigatórios.' });
  }

  // Aceita contatos separados por vírgula, espaço ou nova linha
  const numbers = contacts
    .split(/[\n, ]+/)
    .map(num => num.trim())
    .filter(num => num.length > 0);

  try {
    const results = [];
    for (const to of numbers) {
      const sms = await client.messages.create({
        body: message,
        from: twilioNumber,
        to
      });
      results.push({ to, status: sms.status });
    }
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar SMS', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 