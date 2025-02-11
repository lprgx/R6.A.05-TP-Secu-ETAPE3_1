import crypto from 'crypto';

const users = [];

async function addUser(request, reply) {
  const { email, password } = request.body;
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return reply.status(401).send({ message: 'Utilisateur déjà enregistré' });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const roles = ['admin', 'user'];
  const role = roles[Math.floor(Math.random() * roles.length)];

  users.push({ email, password: hashedPassword, role });
  reply.status(201).send({ message: 'Utilisateur créé' });
}

async function loginUser(request, reply) {
  const { email, password } = request.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const user = users.find(u => u.email === email && u.password === hashedPassword);

  if (!user) {
    return reply.status(401).send({ message: 'Utilisateur non-identifié' });
  }

  const token = await reply.jwtSign({ email: user.email, role: user.role });
  reply.status(200).send({ token });
}

export { addUser, loginUser };
