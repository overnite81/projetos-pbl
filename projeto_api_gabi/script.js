async function carregarUsuarios() {
  const resposta = await fetch('/usuario');
  const usuarios = await resposta.json();

  const lista = document.getElementById('lista');

  if (usuarios.length === 0) {
    lista.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
    return;
  }

  lista.innerHTML = usuarios.map(usuario => `
    <div class="usuario">
      <span><strong>ID:</strong> ${usuario.id} — ${usuario.nome}</span>
      <button class="excluir" onclick="excluirUsuario(${usuario.id})">Excluir</button>
    </div>
  `).join('');
}

async function adicionarUsuario() {
  const nome = document.getElementById('nome').value.trim();

  if (!nome) {
    alert('Digite um nome.');
    return;
  }

  await fetch('/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  document.getElementById('nome').value = '';
  carregarUsuarios();
}

async function atualizarUsuario() {
  const id = document.getElementById('idEdicao').value;
  const nome = document.getElementById('nomeEdicao').value.trim();

  if (!id || !nome) {
    alert('Informe o ID e o novo nome.');
    return;
  }

  const resposta = await fetch('/usuario', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(id), nome })
  });

  const dados = await resposta.json();
  alert(dados.mensagem || dados.erro);
  carregarUsuarios();
}

async function alterarParcial() {
  const id = document.getElementById('idEdicao').value;
  const nome = document.getElementById('nomeEdicao').value.trim();

  if (!id || !nome) {
    alert('Informe o ID e o novo nome.');
    return;
  }

  const resposta = await fetch('/usuario', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(id), nome })
  });

  const dados = await resposta.json();
  alert(dados.mensagem || dados.erro);
  carregarUsuarios();
}

async function excluirUsuario(id) {
  const resposta = await fetch('/usuario', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  const dados = await resposta.json();
  alert(dados.mensagem || dados.erro);
  carregarUsuarios();
}

carregarUsuarios();
