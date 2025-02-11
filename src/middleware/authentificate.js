async function authenticate(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({ message: 'Jeton invalide' });
    }
  }
  
  export default authenticate;
  