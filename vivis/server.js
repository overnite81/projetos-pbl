const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let livros = [];
let proximoId = 1;

// GET — listar livros
app.get("/api/livros", (req, res) => {
  res.json(livros);
});

// GET — consultar um livro específico
app.get("/api/livros/:id", (req, res) => {
  const livro = livros.find(item => item.id === Number(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado." });
  res.json(livro);
});

// POST — cadastrar livro
app.post("/api/livros", (req, res) => {
  const titulo = String(req.body.titulo || "").trim();
  const autor = String(req.body.autor || "").trim();

  if (!titulo || !autor) {
    return res.status(400).json({ erro: "Título e autor são obrigatórios." });
  }

  const livro = {
    id: proximoId++,
    titulo,
    autor,
    ano: req.body.ano ? Number(req.body.ano) : null,
    lido: Boolean(req.body.lido)
  };

  livros.push(livro);
  res.status(201).json(livro);
});

// PUT — substituir os dados do livro
app.put("/api/livros/:id", (req, res) => {
  const livro = livros.find(item => item.id === Number(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado." });

  const titulo = String(req.body.titulo || "").trim();
  const autor = String(req.body.autor || "").trim();
  if (!titulo || !autor) {
    return res.status(400).json({ erro: "Título e autor são obrigatórios." });
  }

  livro.titulo = titulo;
  livro.autor = autor;
  livro.ano = req.body.ano ? Number(req.body.ano) : null;
  livro.lido = Boolean(req.body.lido);
  res.json(livro);
});

// PATCH — alterar somente os campos enviados
app.patch("/api/livros/:id", (req, res) => {
  const livro = livros.find(item => item.id === Number(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado." });

  if (typeof req.body.titulo === "string" && req.body.titulo.trim()) {
    livro.titulo = req.body.titulo.trim();
  }
  if (typeof req.body.autor === "string" && req.body.autor.trim()) {
    livro.autor = req.body.autor.trim();
  }
  if (req.body.ano !== undefined) {
    livro.ano = req.body.ano ? Number(req.body.ano) : null;
  }
  if (typeof req.body.lido === "boolean") {
    livro.lido = req.body.lido;
  }

  res.json(livro);
});

// DELETE — excluir livro
app.delete("/api/livros/:id", (req, res) => {
  const indice = livros.findIndex(item => item.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ erro: "Livro não encontrado." });

  const removido = livros.splice(indice, 1)[0];
  res.json({ mensagem: "Livro excluído com sucesso.", livro: removido });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
