# API de Usuários

## Sobre o projeto

Este projeto foi desenvolvido para a atividade avaliativa de Programação Back-End e Versionamento de Código.

A aplicação utiliza Node.js e Express para criar uma API de usuários com os métodos HTTP GET, POST, PUT, PATCH e DELETE.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Git
- GitHub

## Métodos HTTP

- **GET:** consulta os usuários cadastrados.
- **POST:** adiciona um novo usuário.
- **PUT:** atualiza os dados de um usuário.
- **PATCH:** altera parcialmente os dados de um usuário.
- **DELETE:** exclui um usuário.

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

## Testes

GET:

```bash
curl http://localhost:3000/usuario
```

POST:

```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"id\":2,\"nome\":\"Carlos\"}"
```

PUT:

```bash
curl -X PUT http://localhost:3000/usuario/2 -H "Content-Type: application/json" -d "{\"nome\":\"João\"}"
```

PATCH:

```bash
curl -X PATCH http://localhost:3000/usuario/2 -H "Content-Type: application/json" -d "{\"nome\":\"Ana\"}"
```

DELETE:

```bash
curl -X DELETE http://localhost:3000/usuario/2
```

## Objetivo

Demonstrar o funcionamento dos métodos HTTP e praticar o desenvolvimento Back-End com Node.js e Express, além de utilizar Git e GitHub para versionamento do código.
