# To-do App - Backend Inicial

API REST desenvolvida com Node.js, Express e PostgreSQL (Neon) para o aplicativo de lista de tarefas.

## Tecnologias
- Node.js
- Express
- PostgreSQL (Neon)
- JWT (autenticação)
- Bcryptjs (criptografia de senhas)

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Conta no Neon (neon.tech)

### Instalação
```bash
npm install
```

### Configurar o .env
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```bash
DATABASE_URL=sua_connection_string_do_neon
JWT_SECRET=todo_app_secret_key
PORT=3000
```

### Rodar o servidor
```bash
npm run dev
```

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
    "description": "Descrição da tarefa",
    "completed": false,
    "user_id": 1,
    "created_at": "2026-04-09T05:12:09.759Z"
  }
]
```

#### Criar tarefa
- **POST** `/tasks`
- Body:
```json
{
  "title": "Título da tarefa",
  "description": "Descrição da tarefa"
}
```

#### Atualizar tarefa
- **PUT** `/tasks/:id`
- Body:
```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada",
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
| completed | BOOLEAN | Status da tarefa |
| user_id | INTEGER | Referência ao usuário |
| created_at | TIMESTAMP | Data de criação |
