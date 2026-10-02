# Gerenciador de Tarefas - Atividade Back-End

Projeto desenvolvido para a atividade avaliativa de Programação Back-End e Versionamento de Código.

## Objetivo

Construir uma aplicação web que utilize os métodos HTTP:

- GET
- POST
- PUT
- PATCH
- DELETE

O projeto também deve ser versionado utilizando Git e enviado ao repositório da turma.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- Git
- GitHub

## Estrutura

```text
seu_identificador_unico/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

## Como executar

É necessário ter o Node.js instalado.

1. Abra o terminal dentro da pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Abra no navegador:

```text
http://localhost:3000
```

## Métodos HTTP utilizados

### GET

Lista todas as tarefas:

```text
GET /tarefas
```

### POST

Cria uma nova tarefa:

```text
POST /tarefas
```

Exemplo de JSON:

```json
{
  "titulo": "Estudar JavaScript"
}
```

### PUT

Substitui os dados completos de uma tarefa:

```text
PUT /tarefas/1
```

Exemplo:

```json
{
  "titulo": "Estudar Node.js",
  "concluida": false
}
```

### PATCH

Altera parcialmente uma tarefa:

```text
PATCH /tarefas/1
```

Exemplo:

```json
{
  "concluida": true
}
```

### DELETE

Exclui uma tarefa:

```text
DELETE /tarefas/1
```

## Versionamento

Para versionar o projeto, utilize comandos como:

```bash
git init
git add .
git commit -m "feat: cria aplicação inicial"
```

Depois, adicione o repositório remoto fornecido pelo professor e envie os commits para a branch definida pela turma.

## Observação

Os dados das tarefas ficam armazenados somente na memória do servidor. Portanto, eles são reiniciados quando o servidor é encerrado.
