const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

let usuarios = [
    {
        id: 1,
        nome: "Maria"
    }
];

// GET - buscar usuários
app.get("/usuario", (req, res) => {
    res.json(usuarios);
});

// POST - criar usuário
app.post("/usuario", (req, res) => {
    const novoUsuario = req.body;

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário criado com sucesso!",
        usuario: novoUsuario
    });
});

// PUT - substituir usuário
app.put("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado."
        });
    }

    usuario.nome = req.body.nome;

    res.json({
        mensagem: "Usuário atualizado com PUT!",
        usuario: usuario
    });
});

// PATCH - alterar parcialmente
app.patch("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado."
        });
    }

    if (req.body.nome) {
        usuario.nome = req.body.nome;
    }

    res.json({
        mensagem: "Usuário atualizado com PATCH!",
        usuario: usuario
    });
});

// DELETE - excluir usuário
app.delete("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado."
        });
    }

    const usuarioRemovido = usuarios.splice(indice, 1);

    res.json({
        mensagem: "Usuário excluído com sucesso!",
        usuario: usuarioRemovido[0]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
