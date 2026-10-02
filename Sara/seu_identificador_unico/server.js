const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let tarefas = [
  {
    id: 1,
    titulo: "Estudar métodos HTTP",
    concluida: false
  },
  {
    id: 2,
    titulo: "Enviar projeto para o GitHub",
    concluida: false
  }
];

let proximoId = 3;

// GET /tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({
      erro: "O campo 'titulo' é obrigatório."
    });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

// PUT /tarefas/:id
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, concluida } = req.body;

  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  if (
    typeof titulo !== "string" ||
    typeof concluida !== "boolean"
  ) {
    return res.status(400).json({
      erro: "PUT exige 'titulo' como texto e 'concluida' como booleano."
    });
  }

  tarefas[indice] = {
    id,
    titulo: titulo.trim(),
    concluida
  };

  res.json(tarefas[indice]);
});

// PATCH /tarefas/:id
app.patch("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((item) => item.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) {
    if (typeof titulo !== "string") {
      return res.status(400).json({
        erro: "O título deve ser um texto."
      });
    }

    tarefa.titulo = titulo.trim();
  }

  if (concluida !== undefined) {
    if (typeof concluida !== "boolean") {
      return res.status(400).json({
        erro: "O campo concluida deve ser booleano."
      });
    }

    tarefa.concluida = concluida;
  }

  res.json(tarefa);
});

// DELETE /tarefas/:id
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  const tarefaExcluida = tarefas.splice(indice, 1)[0];

  res.json({
    mensagem: "Tarefa excluída com sucesso.",
    tarefa: tarefaExcluida
  });
});

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
