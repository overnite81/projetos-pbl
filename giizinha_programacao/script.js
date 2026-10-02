async function listarUsuarios() {
    const resposta = await fetch("/usuario");
    const usuarios = await resposta.json();

    document.getElementById("resultado").textContent =
        JSON.stringify(usuarios, null, 2);
}

async function adicionarUsuario() {
    const nome = document.getElementById("nome").value;

    if (!nome) {
        alert("Digite um nome.");
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        nome: nome
    };

    const resposta = await fetch("/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
    });

    const resultado = await resposta.json();

    document.getElementById("resultado").textContent =
        JSON.stringify(resultado, null, 2);

    document.getElementById("nome").value = "";
}
