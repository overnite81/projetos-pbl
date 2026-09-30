# Projeto API de Usuários - Métodos HTTP

Projeto acadêmico para demonstrar o uso dos métodos HTTP:

- GET
- POST
- PUT
- PATCH
- DELETE

## Estrutura

```text
tassiely_cristina/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

## Requisitos

- Node.js
- npm

Verifique a instalação:

```bash
node -v
npm -v
```

## Instalação

Entre na pasta do projeto e execute:

```bash
npm install
```

## Executar o projeto

```bash
npm start
```

Depois abra no navegador:

```text
http://localhost:3000
```

## Rotas da API

### GET

Lista os usuários:

```bash
curl http://localhost:3000/usuario
```

### POST

Cria um novo usuário:

```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"id":2,"nome":"Carlos"}'
```

### PUT

Substitui os dados de um usuário:

```bash
curl -X PUT http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"id":1,"nome":"Carlos"}'
```

### PATCH

Altera parcialmente os dados:

```bash
curl -X PATCH http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"nome":"Ana"}'
```

### DELETE

Exclui o primeiro usuário:

```bash
curl -X DELETE http://localhost:3000/usuario
```

Também é possível informar um ID:

```bash
curl -X DELETE "http://localhost:3000/usuario?id=1"
```

## Versionamento com Git

Depois de clonar o repositório da turma:

```bash
git pull origin main
```

Crie ou coloque a pasta `tassiely_cristina` no repositório.

Depois:

```bash
git add .
git commit -m "Entrega"
```

Antes do push final, atualize novamente:

```bash
git pull origin main
```

Se não houver conflitos:

```bash
git push origin main
```

## Atenção ao repositório compartilhado

Cada aluno deve enviar apenas uma pasta com identificador único.

Se o `git push` for rejeitado porque outro aluno enviou alterações antes, execute:

```bash
git pull origin main
```

Resolva eventuais conflitos, faça o commit e tente novamente:

```bash
git push origin main
```

## Checklist

- [x] API com Express
- [x] GET implementado
- [x] POST implementado
- [x] PUT implementado
- [x] PATCH implementado
- [x] DELETE implementado
- [x] Interface HTML
- [x] CSS
- [x] JavaScript
- [x] package.json
- [x] README.md
- [x] Apenas uma pasta de projeto
