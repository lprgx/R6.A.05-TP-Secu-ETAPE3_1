async function homeHandler(request, reply) {
    reply.send({ hello: 'world' });
  }
  
  async function getAuthHandler(request, reply) {
    try {
      const decoded = await request.jwtVerify();
  
      const message = decoded.role === 'admin' ? 'Full access' : 'Accès limité';
      reply.send({ email: decoded.email, role: decoded.role, message });
    } catch (err) {
      reply.status(401).send({ message: 'Jeton invalide' });
    }
  }
  
  export { homeHandler, getAuthHandler };
  