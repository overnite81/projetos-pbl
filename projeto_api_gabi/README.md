# Projeto API - Métodos HTTP

Projeto desenvolvido para a atividade avaliativa de Programação Back-End e Versionamento de Código.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Git e GitHub

## Métodos HTTP utilizados

- **GET:** lista os usuários.
- **POST:** adiciona um novo usuário.
- **PUT:** atualiza o nome de um usuário.
- **PATCH:** altera parcialmente um usuário.
- **DELETE:** exclui um usuário.

## Como executar

1. Instale o Node.js.
2. Abra o terminal dentro da pasta do projeto.
3. Execute:

```bash
npm install
```

4. Depois execute:

```bash
npm start
```

5. Abra no navegador:

```text
http://localhost:3000
```

## Testes pelo terminal

GET:

```bash
curl http://localhost:3000/usuario
```

POST:

```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"nome\":\"Ana\"}"
```

PUT:

```bash
curl -X PUT http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"id\":1,\"nome\":\"Carlos\"}"
```

PATCH:

```bash
curl -X PATCH http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"id\":1,\"nome\":\"Ana\"}"
```

DELETE:

```bash
curl -X DELETE http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"id\":1}"
```

## Versionamento

O projeto deve ser colocado no repositório da turma e versionado utilizando Git.
