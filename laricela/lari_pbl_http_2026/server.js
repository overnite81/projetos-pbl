const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let tarefas = [
  {
    id: 1,
    titulo: "Estudar programação Back-End",
    descricao: "Revisar os métodos HTTP e o funcionamento de uma API.",
    concluida: false
  },
  {
    id: 2,
    titulo: "Fazer atividade do bimestre",
    descricao: "Criar e versionar a aplicação no GitHub.",
    concluida: true
  }
];

let proximoId = 3;

// GET - lista todas as tarefas
app.get("/api/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

// GET - busca uma tarefa pelo ID
app.get("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(item => item.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  res.status(200).json(tarefa);
});

// POST - cria uma nova tarefa
app.post("/api/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ erro: "O título é obrigatório." });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    descricao: descricao ? descricao.trim() : "",
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT - substitui os dados completos de uma tarefa
app.put("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex(item => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  const { titulo, descricao, concluida } = req.body;

  if (!titulo || typeof concluida !== "boolean") {
    return res.status(400).json({
      erro: "Para PUT, informe titulo e concluida. descricao é opcional."
    });
  }

  tarefas[indice] = {
    id,
    titulo: titulo.trim(),
    descricao: descricao ? descricao.trim() : "",
    concluida
  };

  res.status(200).json(tarefas[indice]);
});

// PATCH - altera parcialmente uma tarefa
app.patch("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(item => item.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  const camposPermitidos = ["titulo", "descricao", "concluida"];
  const camposRecebidos = Object.keys(req.body);

  if (camposRecebidos.length === 0) {
    return res.status(400).json({ erro: "Envie pelo menos um campo para alterar." });
  }

  for (const campo of camposRecebidos) {
    if (!camposPermitidos.includes(campo)) {
      return res.status(400).json({ erro: `Campo não permitido: ${campo}` });
    }
  }

  if (req.body.titulo !== undefined) {
    if (!String(req.body.titulo).trim()) {
      return res.status(400).json({ erro: "O título não pode ficar vazio." });
    }
    tarefa.titulo = String(req.body.titulo).trim();
  }

  if (req.body.descricao !== undefined) {
    tarefa.descricao = String(req.body.descricao).trim();
  }

  if (req.body.concluida !== undefined) {
    if (typeof req.body.concluida !== "boolean") {
      return res.status(400).json({ erro: "concluida deve ser true ou false." });
    }
    tarefa.concluida = req.body.concluida;
  }

  res.status(200).json(tarefa);
});

// DELETE - exclui uma tarefa
app.delete("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex(item => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  const removida = tarefas.splice(indice, 1)[0];

  res.status(200).json({
    mensagem: "Tarefa excluída com sucesso.",
    tarefa: removida
  });
});

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Tratamento básico de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ erro: "JSON inválido." });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});