declare module '@fastify/static' {
    import { FastifyPluginCallback } from 'fastify';
    const fastifyStatic: FastifyPluginCallback<any>;
    export default fastifyStatic;
  }
  