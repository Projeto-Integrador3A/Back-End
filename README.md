# To-do App - Backend Final

API REST desenvolvida com Node.js, Express e PostgreSQL (Neon) para o aplicativo de lista de tarefas. Hospedada no Render.

## Tecnologias
- Node.js
- Express
- PostgreSQL (Neon)
- JWT (autenticação)
- Bcryptjs (criptografia de senhas)
- Render (hospedagem)

## URL da API
```
https://todo-backend-oiwu.onrender.com
```
> ⚠️ O plano gratuito do Render hiberna após inatividade. A primeira requisição pode demorar até 50 segundos.

## Como rodar localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/Projeto-Integrador3A/Back-End
cd backend/final
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar o .env
Crie um arquivo `.env` na raiz da pasta `final`:

```bash
DATABASE_URL=sua_connection_string_do_neon
JWT_SECRET=seu_jwt_secret
PORT=3000
```
> ⚠️ As credenciais do banco de dados devem ser solicitadas ao responsável pelo projeto.

### 4. Rodar o servidor
```bash
npm run dev
```

✅ Se aparecer `Servidor rodando na porta 3000` está funcionando!

## Rotas da API

### Autenticação

#### Cadastro
- **POST** `/auth/register`
- Body:
```json
{
  "name": "Seu nome",
  "email": "seu@email.com",
  "password": "sua_senha"
}
```
- Retorno:
```json
{
  "user": {
    "id": 1,
    "name": "Seu nome",
    "email": "seu@email.com"
  }
}
```

#### Login
- **POST** `/auth/login`
- Body:
```json
{
  "email": "seu@email.com",
  "password": "sua_senha"
}
```
- Retorno:
```json
{
  "token": "seu_token_jwt",
  "user": {
    "id": 1,
    "name": "Seu nome",
    "email": "seu@email.com"
  }
}
```

### Tarefas
> Todas as rotas de tarefas precisam do token JWT no header:
> `Authorization: Bearer seu_token_jwt`

#### Listar tarefas
- **GET** `/tasks`
- Retorno:
```json
[
  {
    "id": 1,
    "title": "Título da tarefa",
    "description": "",
    "date": "2026-06-11",
    "completed": false,
    "user_id": 1,
    "created_at": "2026-06-11T05:12:09.759Z"
  }
]
```

#### Criar tarefa
- **POST** `/tasks`
- Body:
```json
{
  "title": "Título da tarefa",
  "description": "",
  "date": "2026-06-11"
}
```

#### Atualizar tarefa
- **PUT** `/tasks/:id`
- Body:
```json
{
  "title": "Título atualizado",
  "description": "",
  "completed": true
}
```

#### Deletar tarefa
- **DELETE** `/tasks/:id`
- Retorno:
```json
{
  "message": "Tarefa deletada com sucesso"
}
```

## Banco de dados

### Tabela users
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| name | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) | Email único |
| password | VARCHAR(255) | Senha criptografada |
| created_at | TIMESTAMP | Data de criação |

### Tabela tasks
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| title | VARCHAR(255) | Título da tarefa |
| description | TEXT | Descrição da tarefa |
| date | VARCHAR(10) | Data da tarefa |
| completed | BOOLEAN | Status da tarefa |
| user_id | INTEGER | Referência ao usuário |
| created_at | TIMESTAMP | Data de criação |

## Estrutura do projeto
```bash
final/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── database/
│   │   └── db.js
│   └── app.js
├── .env (não versionado)
├── .gitignore
├── package.json
└── server.js
```
