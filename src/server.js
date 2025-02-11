import Fastify from 'fastify';
import path from 'path';
import jwtPlugin from './plugins/jwt.js'; 
import authenticate from './middleware/authentificate.js'; 
import { addUser, loginUser } from './controllers/login.js'; 
import { homeHandler, getAuthHandler } from './controllers/data.js'; 

const authServer = Fastify({ logger: true });
authServer.register(jwtPlugin);
authServer.post('/signup', addUser); 
authServer.post('/signin', loginUser); 

const dataServer = Fastify({ logger: true });
dataServer.register(jwtPlugin); 
dataServer.register(authenticate);
dataServer.get('/home', homeHandler); 
dataServer.get('/auth', getAuthHandler); 

const startAuthServer = async () => {
  try {
    await authServer.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Auth Server running at http://localhost:3000`);
  } catch (err) {
    authServer.log.error(err);
    process.exit(1);
  }
};

const startDataServer = async () => {
  try {
    await dataServer.listen({ port: 4000, host: '0.0.0.0' });
    console.log(`Data Server running at http://localhost:4000`);
  } catch (err) {
    dataServer.log.error(err);
    process.exit(1);
  }
};

startAuthServer();
startDataServer();
