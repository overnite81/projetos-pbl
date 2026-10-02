# Cadastro de Usuários - Métodos HTTP

## Sobre o projeto

Este projeto foi desenvolvido como atividade avaliativa de Programação Back-End e Versionamento de Código.

A aplicação consiste em um sistema simples de cadastro de usuários e utiliza os métodos HTTP GET, POST, PUT, PATCH e DELETE.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Git
- GitHub

## Como executar

Verifique se o Node.js está instalado:

```bash
node -v
npm -v
```

Entre na pasta do projeto:

```bash
cd julia_goncalves
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Abra no navegador:

```text
http://localhost:3000
```

## Métodos HTTP

### GET

Lista os usuários:

```text
GET /usuario
```

```bash
curl http://localhost:3000/usuario
```

### POST

Cadastra um novo usuário:

```text
POST /usuario
```

```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d "{\"nome\":\"João\",\"email\":\"joao@email.com\"}"
```

### PUT

Substitui completamente os dados de um usuário:

```text
PUT /usuario/:id
```

```bash
curl -X PUT http://localhost:3000/usuario/1 -H "Content-Type: application/json" -d "{\"nome\":\"Carlos\",\"email\":\"carlos@email.com\"}"
```

### PATCH

Altera apenas uma parte dos dados:

```text
PATCH /usuario/:id
```

```bash
curl -X PATCH http://localhost:3000/usuario/1 -H "Content-Type: application/json" -d "{\"nome\":\"Ana\"}"
```

### DELETE

Exclui um usuário:

```text
DELETE /usuario/:id
```

```bash
curl -X DELETE http://localhost:3000/usuario/1
```

## Versionamento

O projeto deve ser enviado para o repositório compartilhado utilizando Git.

Comandos principais:

```bash
git add .
git commit -m "Entrega da atividade"
git pull origin main
git push origin main
```

## Objetivo

Demonstrar na prática os métodos HTTP GET, POST, PUT, PATCH e DELETE, além do uso do Git e GitHub para versionamento do código.
