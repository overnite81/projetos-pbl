Este é o servidor Express. Ele implementa todos os cinco métodos exigidos.

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Permite receber JSON nas requisições
app.use(express.json());

// Permite acessar os arquivos da página
app.use(express.static(path.join(__dirname)));

// Banco de dados temporário em memória
let usuarios = [
    {
        id: 1,
        nome: "Maria",
        email: "maria@email.com"
    },
    {
        id: 2,
        nome: "Carlos",
        email: "carlos@email.com"
    }
];

// ======================================================
// GET - Listar todos os usuários
// ======================================================
app.get("/usuario", (req, res) => {
    res.status(200).json(usuarios);
});

// ======================================================
// POST - Criar um novo usuário
// ======================================================
app.post("/usuario", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios."
        });
    }

    const novoUsuario = {
        id: usuarios.length > 0
            ? Math.max(...usuarios.map(usuario => usuario.id)) + 1
            : 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário criado com sucesso.",
        usuario: novoUsuario
    });
});

// ======================================================
// PUT - Substituir completamente um usuário
// ======================================================
app.put("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;

    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Usuário não encontrado."
        });
    }

    if (!nome || !email) {
        return res.status(400).json({
            erro: "No PUT, nome e email são obrigatórios."
        });
    }

    usuarios[indice] = {
        id,
        nome,
        email
    };

    res.status(200).json({
        mensagem: "Usuário substituído com sucesso.",
        usuario: usuarios[indice]
    });
});

// ======================================================
// PATCH - Alterar parcialmente um usuário
// ======================================================
app.patch("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado."
        });
    }

    const { nome, email } = req.body;

    if (nome !== undefined) {
        usuario.nome = nome;
    }

    if (email !== undefined) {
        usuario.email = email;
    }

    res.status(200).json({
        mensagem: "Usuário atualizado parcialmente com sucesso.",
        usuario
    });
});

// ======================================================
// DELETE - Excluir um usuário
// ======================================================
app.delete("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Usuário não encontrado."
        });
    }

    const usuarioRemovido = usuarios.splice(indice, 1)[0];

    res.status(200).json({
        mensagem: "Usuário excluído com sucesso.",
        usuario: usuarioRemovido
    });
});

// ======================================================
// Iniciar servidor
// ======================================================
app.listen(PORT, () => {
    console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
