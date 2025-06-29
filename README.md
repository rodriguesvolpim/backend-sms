# SMS Backend

Backend para envio de SMS usando Twilio.

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais do Twilio:
     - `TWILIO_ACCOUNT_SID`: Seu Account SID do Twilio
     - `TWILIO_AUTH_TOKEN`: Seu Auth Token do Twilio
     - `TWILIO_PHONE_NUMBER`: Seu número de telefone do Twilio

4. Execute o servidor:
   ```bash
   npm start
   ```

## Deploy no Render.com

1. Conecte seu repositório ao Render
2. Configure as variáveis de ambiente no painel do Render:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
   - `PORT` (opcional, o Render define automaticamente)

## API

### POST /send-sms

Envia SMS para múltiplos contatos.

**Body:**
```json
{
  "contacts": "1234567890, 0987654321",
  "message": "Sua mensagem aqui"
}
```

**Resposta:**
```json
{
  "success": true,
  "results": [
    {
      "to": "1234567890",
      "status": "sent"
    }
  ]
}
```
