const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let proximoId = 3;
let usuarios = [
  { id: 1, nome: 'Maria', email: 'maria@example.com' },
  { id: 2, nome: 'Carlos', email: 'carlos@example.com' }
];

// GET: listar todos os usuários
app.get('/usuario', (req, res) => {
  res.json(usuarios);
});

// GET: consultar um usuário por ID
app.get('/usuario/:id', (req, res) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  res.json(usuario);
});

// POST: criar um usuário
app.post('/usuario', (req, res) => {
  const { nome, email } = req.body;
  if (typeof nome !== 'string' || !nome.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ erro: 'Informe nome e e-mail.' });
  }
  const usuario = { id: proximoId++, nome: nome.trim(), email: email.trim() };
  usuarios.push(usuario);
  res.status(201).json(usuario);
});

// PUT: substituir todos os campos editáveis de um usuário
app.put('/usuario/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  const { nome, email } = req.body;
  if (typeof nome !== 'string' || !nome.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ erro: 'Para PUT, informe nome e e-mail.' });
  }
  usuarios[indice] = { id, nome: nome.trim(), email: email.trim() };
  res.json(usuarios[indice]);
});

// PATCH: atualizar somente os campos enviados
app.patch('/usuario/:id', (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  const campos = ['nome', 'email'];
  const enviados = campos.filter((campo) => req.body[campo] !== undefined);
  if (!enviados.length) return res.status(400).json({ erro: 'Informe nome e/ou e-mail para atualizar.' });
  for (const campo of enviados) {
    if (typeof req.body[campo] !== 'string' || !req.body[campo].trim()) {
      return res.status(400).json({ erro: `O campo ${campo} deve ser um texto não vazio.` });
    }
  }
  enviados.forEach((campo) => { usuario[campo] = req.body[campo].trim(); });
  res.json(usuario);
});

// DELETE: remover um usuário
app.delete('/usuario/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  usuarios.splice(indice, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
