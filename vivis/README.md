# Atividade avaliativa — Controle de Livros

## Sobre o projeto
Aplicação web para cadastrar e organizar livros, feita com HTML, CSS, JavaScript, Node.js e Express.

## Métodos HTTP
- `GET /api/livros` — lista todos os livros.
- `GET /api/livros/:id` — consulta um livro específico.
- `POST /api/livros` — cadastra um livro.
- `PUT /api/livros/:id` — substitui os dados editáveis de um livro.
- `PATCH /api/livros/:id` — atualiza parcialmente os dados (por exemplo, o status de leitura).
- `DELETE /api/livros/:id` — exclui um livro.

## Como executar
1. Instale o Node.js (versão LTS).
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal nessa pasta.
4. Execute `npm install`.
5. Execute `npm start`.
6. Abra `http://localhost:3000` no navegador.

## Observação
Este projeto guarda os livros em memória. Eles são apagados quando o servidor é reiniciado.

## Git e GitHub
Crie somente uma pasta individual no repositório da turma, usando o identificador único exigido pelo professor. Faça commits e envie os arquivos para essa pasta.

**Segurança:** não coloque tokens, senhas ou chaves de acesso em arquivos ou commits. Se um token foi exposto em um documento ou conversa, revogue-o no GitHub e gere outro somente se necessário.
