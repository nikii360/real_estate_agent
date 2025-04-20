import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from 'dotenv';
import { ElevenLabsClient } from 'elevenlabs';

config(); // Load env vars

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: '*', // tighten in production
});

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

fastify.post('/start-call', async (req, reply) => {
  try {
    const response = await client.conversationalAi.twilioOutboundCall({
      agent_id: '606kCnF7n0yQevgo8Nte',
      agent_phone_number_id: 'ZAErUDT6eQgMjNgiabmK',
      to_number: '+919667834137',
      conversation_initiation_client_data: {
        conversation_config_override: {
          agent: {
            language: 'English',
          },
        },
        dynamic_variables: {
          user_name: 'Nikhil Pavanan',
          available_time: new Date().toISOString(),
          user_available: false,
          email_address: 'nikhil.pavanan@gmail.com',
        },
      },
    });
    
    console.log("Twilio Response: ", response);
    reply.send({ success: true, response });
  } catch (error) {
    console.error('Call Error:', error);
    reply.status(500).send({ error: 'Failed to initiate call', details: error });
  }
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`🚀 Server ready at ${address}`);
});
