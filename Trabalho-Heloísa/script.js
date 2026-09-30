const form = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");
const resultado = document.getElementById("resultado");
const btnAtualizar = document.getElementById("btnAtualizar");

// ======================================================
// Mostrar resultado da requisição
// ======================================================

function mostrarResultado(dados) {
    resultado.textContent = JSON.stringify(dados, null, 2);
}

// ======================================================
// GET - Buscar usuários
// ======================================================

async function carregarUsuarios() {
    try {
        const resposta = await fetch("/usuario");

        const dados = await resposta.json();

        mostrarResultado(dados);

        listaUsuarios.innerHTML = "";

        if (dados.length === 0) {
            listaUsuarios.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
            return;
        }

        dados.forEach(usuario => {

            const elemento = document.createElement("div");

            elemento.className = "usuario";

            elemento.innerHTML = `
                <div class="usuario-info">
                    <h3>${usuario.nome}</h3>
                    <p>${usuario.email}</p>
                    <small>ID: ${usuario.id}</small>
                </div>

                <div class="acoes">

                    <button
                        class="btn btn-put"
                        onclick="editarUsuario(${usuario.id})"
                    >
                        PUT
                    </button>

                    <button
                        class="btn btn-patch"
                        onclick="alterarUsuario(${usuario.id})"
                    >
                        PATCH
                    </button>

                    <button
                        class="btn btn-delete"
                        onclick="excluirUsuario(${usuario.id})"
                    >
                        DELETE
                    </button>

                </div>
            `;

            listaUsuarios.appendChild(elemento);
        });

    } catch (erro) {

        resultado.textContent =
            "Erro ao conectar com o servidor: " + erro.message;
    }
}

// ======================================================
// POST - Criar usuário
// ======================================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    try {

        const resposta = await fetch("/usuario", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                email
            })
        });

        const dados = await resposta.json();

        mostrarResultado(dados);

        form.reset();

        carregarUsuarios();

    } catch (erro) {

        resultado.textContent =
            "Erro ao criar usuário: " + erro.message;
    }
});

// ======================================================
// PUT - Substituir usuário
// ======================================================

async function editarUsuario(id) {

    const nome = prompt("Digite o novo nome:");

    if (!nome) {
        return;
    }

    const email = prompt("Digite o novo email:");

    if (!email) {
        return;
    }

    try {

        const resposta = await fetch(`/usuario/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                email
            })
        });

        const dados = await resposta.json();

        mostrarResultado(dados);

        carregarUsuarios();

    } catch (erro) {

        resultado.textContent =
            "Erro ao utilizar PUT: " + erro.message;
    }
}

// ======================================================
// PATCH - Alterar parcialmente usuário
// ======================================================

async function alterarUsuario(id) {

    const nome = prompt(
        "Digite o novo nome. Deixe vazio para não alterar:"
    );

    const email = prompt(
        "Digite o novo email. Deixe vazio para não alterar:"
    );

    const dadosAlteracao = {};

    if (nome) {
        dadosAlteracao.nome = nome;
    }

    if (email) {
        dadosAlteracao.email = email;
    }

    if (Object.keys(dadosAlteracao).length === 0) {
        alert("Nenhuma alteração foi informada.");
        return;
    }

    try {

        const resposta = await fetch(`/usuario/${id}`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dadosAlteracao)
        });

        const dados = await resposta.json();

        mostrarResultado(dados);

        carregarUsuarios();

    } catch (erro) {

        resultado.textContent =
            "Erro ao utilizar PATCH: " + erro.message;
    }
}

// ======================================================
// DELETE - Excluir usuário
// ======================================================

async function excluirUsuario(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este usuário?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(`/usuario/${id}`, {
            method: "DELETE"
        });

        const dados = await resposta.json();

        mostrarResultado(dados);

        carregarUsuarios();

    } catch (erro) {

        resultado.textContent =
            "Erro ao utilizar DELETE: " + erro.message;
    }
}

// ======================================================
// Botão GET
// ======================================================

btnAtualizar.addEventListener("click", carregarUsuarios);

// Carregar usuários ao abrir a página
carregarUsuarios();
