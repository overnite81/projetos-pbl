const resultado = document.getElementById("resultado");

function dados() {
  const id = Number(document.getElementById("id").value);
  const nome = document.getElementById("nome").value;

  return { id, nome };
}

async function requisicao(url, opcoes = {}) {
  try {
    const resposta = await fetch(url, opcoes);
    const texto = await resposta.text();

    let dados;
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = texto;
    }

    resultado.textContent = JSON.stringify(
      { status: resposta.status, dados },
      null,
      2
    );
  } catch (erro) {
    resultado.textContent = "Erro: " + erro.message;
  }
}

function listar() {
  requisicao("/usuario");
}

function criar() {
  requisicao("/usuario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados())
  });
}

function atualizar() {
  requisicao("/usuario", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados())
  });
}

function alterar() {
  const nome = document.getElementById("nome").value;

  requisicao("/usuario", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });
}

function excluir() {
  requisicao("/usuario", {
    method: "DELETE"
  });
}
