import fs from 'fs';
import fastifyJwt from 'fastify-jwt';

async function jwtPlugin(fastify) {
  fastify.register(fastifyJwt, {
    secret: {
      private: fs.readFileSync('.ssl/private.key'),
      public: fs.readFileSync('.ssl/public.key'),
    },
    sign: { algorithm: 'ES256' },
    verify: { algorithms: ['ES256'] },
  });
}

export default jwtPlugin;
