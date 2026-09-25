const lista = document.getElementById("lista");
const status = document.getElementById("status");
const form = document.getElementById("form-tarefa");

async function carregarTarefas() {
  status.textContent = "Carregando...";
  try {
    const resposta = await fetch("/api/tarefas");
    const tarefas = await resposta.json();

    if (!resposta.ok) throw new Error(tarefas.erro || "Erro ao carregar.");

    renderizar(tarefas);
    status.textContent = `${tarefas.length} tarefa(s) cadastrada(s).`;
  } catch (erro) {
    status.textContent = erro.message;
  }
}

function renderizar(tarefas) {
  if (tarefas.length === 0) {
    lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
    return;
  }

  lista.innerHTML = tarefas.map(tarefa => `
    <article class="tarefa ${tarefa.concluida ? "concluida" : ""}">
      <div class="tarefa-topo">
        <h3>${escapar(tarefa.titulo)}</h3>
        <span>#${tarefa.id}</span>
      </div>
      <p>${escapar(tarefa.descricao || "Sem descrição.")}</p>
      <p><strong>Status:</strong> ${tarefa.concluida ? "Concluída" : "Pendente"}</p>
      <div class="acoes">
        <button onclick="alternarStatus(${tarefa.id})">PATCH status</button>
        <button class="gray" onclick="editarTarefa(${tarefa.id})">PUT editar</button>
        <button class="danger" onclick="excluirTarefa(${tarefa.id})">DELETE</button>
      </div>
    </article>
  `).join("");
}

async function criarTarefa(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const resposta = await fetch("/api/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    alert(dados.erro || "Não foi possível criar.");
    return;
  }

  form.reset();
  await carregarTarefas();
}

async function alternarStatus(id) {
  const tarefas = await fetch("/api/tarefas").then(res => res.json());
  const tarefa = tarefas.find(item => item.id === id);

  if (!tarefa) return;

  await fetch(`/api/tarefas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ concluida: !tarefa.concluida })
  });

  carregarTarefas();
}

async function editarTarefa(id) {
  const titulo = prompt("Novo título:");
  if (titulo === null) return;

  const descricao = prompt("Nova descrição:");
  if (descricao === null) return;

  const resposta = await fetch(`/api/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo,
      descricao,
      concluida: false
    })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    alert(dados.erro || "Não foi possível editar.");
    return;
  }

  carregarTarefas();
}

async function excluirTarefa(id) {
  const confirmar = confirm("Deseja excluir esta tarefa?");
  if (!confirmar) return;

  const resposta = await fetch(`/api/tarefas/${id}`, {
    method: "DELETE"
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    alert(dados.erro || "Não foi possível excluir.");
    return;
  }

  carregarTarefas();
}

function escapar(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", criarTarefa);
document.getElementById("btn-atualizar").addEventListener("click", carregarTarefas);

carregarTarefas();