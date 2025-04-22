import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { config } from 'dotenv';
import { ElevenLabsClient } from 'elevenlabs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config(); // Load env vars

const fastify = Fastify({ logger: true });

// 🔥 Serve static files from /public
await fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/', // means /index.html will be available at /
});

await fastify.register(cors, {
  origin: '*', // tighten in production
});

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

fastify.post('/start-call', async (req, reply) => {
  try {
    const body = req.body as any;

    const response = await client.conversationalAi.twilioOutboundCall({
      agent_id: body.agent_id,
      agent_phone_number_id: body.agent_phone_number_id,
      to_number: body.to_number,
      conversation_initiation_client_data: body.conversation_initiation_client_data,
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
