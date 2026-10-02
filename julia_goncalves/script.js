const form = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

// GET - buscar usuários
async function carregarUsuarios() {
    try {
        const resposta = await fetch("/usuario");
        const usuarios = await resposta.json();

        listaUsuarios.innerHTML = "";

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
            return;
        }

        usuarios.forEach(usuario => {
            const div = document.createElement("div");
            div.className = "usuario";

            div.innerHTML = `
                <div class="informacoes">
                    <strong>${usuario.nome}</strong>
                    <span>${usuario.email}</span>
                </div>

                <div class="acoes">
                    <button class="botao-editar" onclick="editarUsuario(${usuario.id})">
                        PUT
                    </button>

                    <button class="botao-editar" onclick="alterarNome(${usuario.id})">
                        PATCH
                    </button>

                    <button class="botao-excluir" onclick="excluirUsuario(${usuario.id})">
                        DELETE
                    </button>
                </div>
            `;

            listaUsuarios.appendChild(div);
        });
    } catch (erro) {
        listaUsuarios.innerHTML = "<p>Erro ao carregar os usuários.</p>";
    }
}

// POST - cadastrar usuário
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    try {
        const resposta = await fetch("/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem);
            return;
        }

        alert("Usuário cadastrado com sucesso!");
        form.reset();
        carregarUsuarios();
    } catch (erro) {
        alert("Erro ao cadastrar usuário.");
    }
});

// PUT - substituir todos os dados
async function editarUsuario(id) {
    const novoNome = prompt("Digite o novo nome:");

    if (novoNome === null || novoNome.trim() === "") return;

    const novoEmail = prompt("Digite o novo e-mail:");

    if (novoEmail === null || novoEmail.trim() === "") return;

    try {
        const resposta = await fetch(`/usuario/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: novoNome,
                email: novoEmail
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem);
            return;
        }

        alert("Usuário atualizado com PUT!");
        carregarUsuarios();
    } catch (erro) {
        alert("Erro ao editar usuário.");
    }
}

// PATCH - alterar apenas o nome
async function alterarNome(id) {
    const novoNome = prompt("Digite o novo nome:");

    if (novoNome === null || novoNome.trim() === "") return;

    try {
        const resposta = await fetch(`/usuario/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: novoNome
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem);
            return;
        }

        alert("Nome alterado com PATCH!");
        carregarUsuarios();
    } catch (erro) {
        alert("Erro ao alterar nome.");
    }
}

// DELETE - excluir usuário
async function excluirUsuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuário?");

    if (!confirmar) return;

    try {
        const resposta = await fetch(`/usuario/${id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem);
            return;
        }

        alert("Usuário excluído com sucesso!");
        carregarUsuarios();
    } catch (erro) {
        alert("Erro ao excluir usuário.");
    }
}

// Carrega os usuários quando a página abre
carregarUsuarios();
