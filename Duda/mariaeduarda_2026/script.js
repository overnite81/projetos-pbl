const API_URL = '/usuario';
const form = document.querySelector('#user-form');
const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle('error', erro);
}

async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: { 'Content-Type': 'application/json', ...(opcoes.headers || {}) }
  });
  const dados = resposta.status === 204 ? null : await resposta.json();
  if (!resposta.ok) throw new Error(dados?.erro || 'Ocorreu um erro na requisição.');
  return dados;
}

async function carregarUsuarios() {
  try {
    const usuarios = await requisicao(API_URL); // GET
    lista.innerHTML = '';
    if (!usuarios.length) {
      lista.innerHTML = '<p>Nenhum usuário cadastrado ainda.</p>';
      return;
    }
    usuarios.forEach((usuario) => {
      const item = document.createElement('article');
      item.className = 'user';
      const info = document.createElement('div');
      const nome = document.createElement('strong');
      nome.textContent = `${usuario.nome} (ID ${usuario.id})`;
      const email = document.createElement('p');
      email.textContent = usuario.email;
      info.append(nome, email);

      const acoes = document.createElement('div');
      acoes.className = 'actions';
      const editar = document.createElement('button');
      editar.className = 'outline';
      editar.textContent = 'Editar (PUT)';
      editar.addEventListener('click', () => substituirUsuario(usuario));
      const atualizarEmail = document.createElement('button');
      atualizarEmail.className = 'secondary';
      atualizarEmail.textContent = 'Alterar nome (PATCH)';
      atualizarEmail.addEventListener('click', () => atualizarParcial(usuario));
      const excluir = document.createElement('button');
      excluir.className = 'danger';
      excluir.textContent = 'Excluir (DELETE)';
      excluir.addEventListener('click', () => excluirUsuario(usuario));
      acoes.append(editar, atualizarEmail, excluir);
      item.append(info, acoes);
      lista.append(item);
    });
  } catch (erro) {
    lista.innerHTML = '<p>Não foi possível carregar a lista. Verifique se o servidor está funcionando.</p>';
    mostrarMensagem(erro.message, true);
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const email = document.querySelector('#email').value.trim();
  try {
    await requisicao(API_URL, { method: 'POST', body: JSON.stringify({ nome, email }) });
    form.reset();
    mostrarMensagem('Usuário cadastrado com sucesso (POST).');
    await carregarUsuarios();
  } catch (erro) { mostrarMensagem(erro.message, true); }
});

async function substituirUsuario(usuario) {
  const nome = prompt('Novo nome:', usuario.nome);
  if (nome === null) return;
  const email = prompt('Novo e-mail:', usuario.email);
  if (email === null) return;
  try {
    await requisicao(`${API_URL}/${usuario.id}`, {
      method: 'PUT', body: JSON.stringify({ nome: nome.trim(), email: email.trim() })
    });
    mostrarMensagem('Usuário substituído com sucesso (PUT).');
    await carregarUsuarios();
  } catch (erro) { mostrarMensagem(erro.message, true); }
}

async function atualizarParcial(usuario) {
  const nome = prompt('Digite o novo nome:', usuario.nome);
  if (nome === null || !nome.trim()) return;
  try {
    await requisicao(`${API_URL}/${usuario.id}`, {
      method: 'PATCH', body: JSON.stringify({ nome: nome.trim() })
    });
    mostrarMensagem('Usuário atualizado parcialmente (PATCH).');
    await carregarUsuarios();
  } catch (erro) { mostrarMensagem(erro.message, true); }
}

async function excluirUsuario(usuario) {
  if (!confirm(`Deseja excluir ${usuario.nome}?`)) return;
  try {
    await requisicao(`${API_URL}/${usuario.id}`, { method: 'DELETE' });
    mostrarMensagem('Usuário excluído com sucesso (DELETE).');
    await carregarUsuarios();
  } catch (erro) { mostrarMensagem(erro.message, true); }
}

document.querySelector('#atualizar').addEventListener('click', carregarUsuarios);
carregarUsuarios();
