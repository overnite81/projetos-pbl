# Projeto HTTP - GET, POST, PUT, PATCH e DELETE

## Objetivo

Construir uma aplicação web utilizando os principais métodos HTTP:

- GET
- POST
- PUT
- PATCH
- DELETE

O projeto foi desenvolvido utilizando Node.js e Express.

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
projeto_http_5metodos_8f3c21/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md

Instalação
É necessário possuir Node.js instalado.

Verifique a instalação:

node -v
npm -v

Depois, entre na pasta do projeto:

cd projeto_http_5metodos_8f3c21

Instale as dependências:

npm install

Executando o projeto
Execute:

npm start

O servidor será iniciado em:

http://localhost:3000

Abra o endereço no navegador.

Métodos HTTP implementados
GET
Retorna todos os usuários.

GET /usuario

Exemplo:

curl http://localhost:3000/usuario

POST
Cria um novo usuário.

POST /usuario

Exemplo:

curl -X POST http://localhost:3000/usuario \
-H "Content-Type: application/json" \
-d '{"nome":"Ana","email":"ana@email.com"}'

PUT
Substitui completamente um usuário.

PUT /usuario/:id

Exemplo:

curl -X PUT http://localhost:3000/usuario/1 \
-H "Content-Type: application/json" \
-d '{"nome":"Carlos","email":"carlos@email.com"}'

PATCH
Altera parcialmente um usuário.

PATCH /usuario/:id

Exemplo:

curl -X PATCH http://localhost:3000/usuario/1 \
-H "Content-Type: application/json" \
-d '{"nome":"João"}'

DELETE
Exclui um usuário.

DELETE /usuario/:id

Exemplo:

curl -X DELETE http://localhost:3000/usuario/1

Testando pela página
A própria página permite testar os cinco métodos:

GET: atualiza a lista de usuários.

POST: cria um novo usuário.

PUT: substitui nome e email.

PATCH: altera nome e/ou email.

DELETE: remove um usuário.

Observação
Os dados são armazenados somente em memória. Portanto, ao desligar o servidor, os usuários retornam aos valores iniciais.

Versionamento
O projeto deve ser enviado ao repositório GitHub da turma.

Comandos utilizados:

git clone https://github.com/overnite81/projetos-pbl.git

cd projetos-pbl

git pull origin main

mkdir projeto_http_5metodos_8f3c21

Depois de colocar os arquivos dentro da pasta:

git add .

git commit -m "Entrega projeto metodos HTTP"

git pull origin main

git push origin main

Checklist
 GET implementado

 POST implementado

 PUT implementado

 PATCH implementado

 DELETE implementado

 Interface web

 Express

 README

 package.json

 Projeto organizado em uma única pasta

 Commit realizado no GitHub

 Push realizado no GitHub
