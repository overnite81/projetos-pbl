# Cadastro de Usuários — Back-End e Versionamento

Projeto educacional com Node.js e Express para demonstrar os métodos HTTP GET, POST, PUT, PATCH e DELETE.

## Requisitos
- Node.js e npm instalados.

Confira a instalação:
```bash
node -v
npm -v
```

## Instalação e execução
No terminal, dentro desta pasta:
```bash
npm install
npm start
```
Abra http://localhost:3000 no navegador.

## Rotas implementadas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuario` | Lista todos os usuários |
| GET | `/usuario/:id` | Consulta usuário por ID |
| POST | `/usuario` | Cria um usuário |
| PUT | `/usuario/:id` | Substitui nome e e-mail |
| PATCH | `/usuario/:id` | Atualiza parcialmente nome e/ou e-mail |
| DELETE | `/usuario/:id` | Exclui usuário |

Os dados ficam em memória e são reiniciados quando o servidor é encerrado. Este comportamento é adequado para uma demonstração didática, não para produção.

## Testes com curl

Listar usuários:
```bash
curl http://localhost:3000/usuario
```

Criar usuário:
```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"nome":"Maria","email":"maria@example.com"}'
```

Substituir os dados do usuário de ID 1:
```bash
curl -X PUT http://localhost:3000/usuario/1 -H "Content-Type: application/json" -d '{"nome":"Carlos","email":"carlos@example.com"}'
```

Atualizar apenas o nome:
```bash
curl -X PATCH http://localhost:3000/usuario/1 -H "Content-Type: application/json" -d '{"nome":"Ana"}'
```

Excluir usuário:
```bash
curl -X DELETE http://localhost:3000/usuario/1
```

## Versionamento com Git

Crie ou clone o repositório da turma conforme as instruções da professora. Coloque **somente esta pasta** no repositório e confirme que o nome da pasta é único entre os alunos.

Antes de começar e antes do envio final, sincronize a branch principal:
```bash
git pull origin main
git add sua_pasta_individual/
git commit -m "Entrega da atividade de Back-End"
git pull origin main
git push origin main
```

Se houver conflito, resolva os marcadores no arquivo afetado, salve, faça `git add` e `git commit` antes do push. Nunca coloque tokens de acesso no código ou no README.
