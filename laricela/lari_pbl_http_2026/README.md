# Projeto PBL - API de Tarefas

Aplicação web desenvolvida para a atividade avaliativa de Programação Back-End e Versionamento de Código.

## Objetivo

Construir uma aplicação web utilizando os métodos HTTP:

- GET
- POST
- PUT
- PATCH
- DELETE

O projeto utiliza Node.js e Express no back-end e HTML, CSS e JavaScript no front-end.

## Estrutura

```text
lari_pbl_http_2026/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

## Como executar

É necessário ter o Node.js instalado.

No terminal, dentro da pasta do projeto:

```bash
npm install
npm start
```

Depois, abra:

```text
http://localhost:3000
```

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | `/api/tarefas` | Lista todas as tarefas |
| GET | `/api/tarefas/:id` | Consulta uma tarefa |
| POST | `/api/tarefas` | Cria uma tarefa |
| PUT | `/api/tarefas/:id` | Substitui uma tarefa |
| PATCH | `/api/tarefas/:id` | Altera parcialmente |
| DELETE | `/api/tarefas/:id` | Exclui uma tarefa |

## Versionamento no GitHub

A pasta do projeto deve ser colocada dentro do repositório da turma, respeitando a regra de uma única pasta por aluno.

Exemplo de comandos:

```bash
git clone https://github.com/overnite81/projetos-pbl.git
cd projetos-pbl
```

Copie a pasta `lari_pbl_http_2026` para dentro do repositório.

Depois:

```bash
git add lari_pbl_http_2026
git commit -m "Adiciona projeto PBL com API HTTP"
git push origin main
```

Se a branch principal do repositório tiver outro nome, use o nome indicado pelo professor.

## Observação de segurança

Nunca coloque tokens, senhas ou chaves de acesso dentro dos arquivos do projeto ou em commits do Git. Use credenciais de forma segura e, se um token tiver sido exposto, ele deve ser revogado/rotacionado pelo proprietário.
