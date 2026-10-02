const API_URL = "/tarefas";

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const refreshButton = document.getElementById("refreshButton");

function showMessage(text, type = "success") {
  message.textContent = text;
  message.className = `message ${type}`;

  setTimeout(() => {
    message.textContent = "";
    message.className = "message";
  }, 3000);
}

// GET - busca todas as tarefas
async function carregarTarefas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Não foi possível carregar as tarefas.");
    }

    const tarefas = await response.json();
    renderizarTarefas(tarefas);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

// POST - cria uma nova tarefa
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titulo = taskTitle.value.trim();

  if (!titulo) return;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ titulo })
    });

    if (!response.ok) {
      throw new Error("Erro ao criar tarefa.");
    }

    taskTitle.value = "";
    showMessage("Tarefa criada com sucesso!");
    carregarTarefas();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

// PUT - substitui os dados completos de uma tarefa
async function editarTarefa(id, tituloAtual, concluidaAtual) {
  const novoTitulo = prompt("Digite o novo título:", tituloAtual);

  if (novoTitulo === null || !novoTitulo.trim()) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: novoTitulo.trim(),
        concluida: concluidaAtual
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar a tarefa com PUT.");
    }

    showMessage("Tarefa atualizada com PUT!");
    carregarTarefas();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

// PATCH - altera apenas parte da tarefa
async function alternarConclusao(id, concluidaAtual) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        concluida: !concluidaAtual
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar a tarefa com PATCH.");
    }

    showMessage("Status atualizado com PATCH!");
    carregarTarefas();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

// DELETE - exclui uma tarefa
async function excluirTarefa(id) {
  if (!confirm("Deseja realmente excluir esta tarefa?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir a tarefa.");
    }

    showMessage("Tarefa excluída com DELETE!");
    carregarTarefas();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

function renderizarTarefas(tarefas) {
  taskList.innerHTML = "";

  if (tarefas.length === 0) {
    taskList.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
    return;
  }

  tarefas.forEach((tarefa) => {
    const article = document.createElement("article");
    article.className = "task";

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("strong");
    title.textContent = tarefa.titulo;

    const status = document.createElement("span");
    status.textContent = tarefa.concluida ? "Concluída" : "Pendente";

    info.appendChild(title);
    info.appendChild(status);

    const actions = document.createElement("div");
    actions.className = "actions";

    const putButton = document.createElement("button");
    putButton.className = "edit";
    putButton.textContent = "PUT";
    putButton.onclick = () =>
      editarTarefa(tarefa.id, tarefa.titulo, tarefa.concluida);

    const patchButton = document.createElement("button");
    patchButton.className = "patch";
    patchButton.textContent = "PATCH";
    patchButton.onclick = () =>
      alternarConclusao(tarefa.id, tarefa.concluida);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "DELETE";
    deleteButton.onclick = () => excluirTarefa(tarefa.id);

    actions.append(putButton, patchButton, deleteButton);
    article.append(info, actions);
    taskList.appendChild(article);
  });
}

refreshButton.addEventListener("click", carregarTarefas);

carregarTarefas();
