const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let usuarios = [
  { id: 1, nome: 'Maria' },
  { id: 2, nome: 'Carlos' }
];

// GET - listar usuários
app.get('/usuario', (req, res) => {
  res.json(usuarios);
});

// POST - criar usuário
app.post('/usuario', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'O nome é obrigatório.' });
  }

  const novoId = usuarios.length > 0
    ? Math.max(...usuarios.map(usuario => usuario.id)) + 1
    : 1;

  const novoUsuario = { id: novoId, nome };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// PUT - atualizar usuário completo
app.put('/usuario', (req, res) => {
  const { id, nome } = req.body;
  const usuario = usuarios.find(usuario => usuario.id === Number(id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  if (!nome) {
    return res.status(400).json({ erro: 'O nome é obrigatório.' });
  }

  usuario.nome = nome;
  res.json({ mensagem: 'Usuário atualizado com PUT.', usuario });
});

// PATCH - alterar parcialmente
app.patch('/usuario', (req, res) => {
  const { id, nome } = req.body;
  const usuario = usuarios.find(usuario => usuario.id === Number(id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  if (nome) {
    usuario.nome = nome;
  }

  res.json({ mensagem: 'Usuário alterado com PATCH.', usuario });
});

// DELETE - excluir usuário
app.delete('/usuario', (req, res) => {
  const { id } = req.body;
  const indice = usuarios.findIndex(usuario => usuario.id === Number(id));

  if (indice === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const removido = usuarios.splice(indice, 1)[0];

  res.json({ mensagem: 'Usuário excluído com DELETE.', usuario: removido });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
