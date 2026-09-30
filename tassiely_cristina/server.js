const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let usuarios = [
  { id: 1, nome: "Maria" }
];

// GET - listar usuários
app.get("/usuario", (req, res) => {
  res.json(usuarios);
});

// POST - criar usuário
app.post("/usuario", (req, res) => {
  const { id, nome } = req.body;

  if (!id || !nome) {
    return res.status(400).json({
      mensagem: "Informe id e nome."
    });
  }

  if (usuarios.some(usuario => usuario.id === id)) {
    return res.status(409).json({
      mensagem: "Já existe um usuário com esse ID."
    });
  }

  const novoUsuario = { id, nome };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// PUT - substituir usuário
app.put("/usuario", (req, res) => {
  const { id, nome } = req.body;
  const indice = usuarios.findIndex(usuario => usuario.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado."
    });
  }

  if (!nome) {
    return res.status(400).json({
      mensagem: "Informe o nome."
    });
  }

  usuarios[indice] = { id, nome };

  res.json(usuarios[indice]);
});

// PATCH - alterar parcialmente
app.patch("/usuario", (req, res) => {
  const { id, nome } = req.body;

  // Se o ID não for enviado, altera o primeiro usuário.
  const indice = id
    ? usuarios.findIndex(usuario => usuario.id === id)
    : 0;

  if (indice === -1 || !usuarios[indice]) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado."
    });
  }

  if (nome) {
    usuarios[indice].nome = nome;
  }

  res.json(usuarios[indice]);
});

// DELETE - excluir usuário
app.delete("/usuario", (req, res) => {
  const id = req.body?.id || Number(req.query.id);

  if (id) {
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    const removido = usuarios.splice(indice, 1)[0];
    return res.json({
      mensagem: "Usuário excluído com sucesso.",
      usuario: removido
    });
  }

  if (usuarios.length === 0) {
    return res.status(404).json({
      mensagem: "Não há usuários para excluir."
    });
  }

  const removido = usuarios.shift();

  res.json({
    mensagem: "Usuário excluído com sucesso.",
    usuario: removido
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
