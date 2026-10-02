const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let usuarios = [
    { id: 1, nome: "Maria", email: "maria@email.com" },
    { id: 2, nome: "Carlos", email: "carlos@email.com" }
];

// GET - listar usuários
app.get("/usuario", (req, res) => {
    res.json(usuarios);
});

// POST - cadastrar usuário
app.post("/usuario", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
    }

    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// PUT - substituir completamente um usuário
app.put("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios no PUT." });
    }

    usuarios[indice] = { id, nome, email };
    res.json(usuarios[indice]);
});

// PATCH - alterar parcialmente um usuário
app.patch("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    if (nome !== undefined) usuario.nome = nome;
    if (email !== undefined) usuario.email = email;

    res.json(usuario);
});

// DELETE - excluir usuário
app.delete("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const usuarioRemovido = usuarios.splice(indice, 1)[0];

    res.json({
        mensagem: "Usuário excluído com sucesso.",
        usuario: usuarioRemovido
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
