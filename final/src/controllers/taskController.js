const pool = require('../database/db');

const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    const user = await pool.query('SELECT name FROM users WHERE id = $1', [req.userId]);
    console.log(`Buscando tarefas do usuário: ${user.rows[0].name}`);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const createTask = async (req, res) => {
  const { title, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, date, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, date, req.userId]
    );
    const user = await pool.query('SELECT name FROM users WHERE id = $1', [req.userId]);
    console.log(`Nova tarefa criada: ${title} - Data: ${date} - Usuário: ${user.rows[0].name}`);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, completed, id, req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    const user = await pool.query('SELECT name FROM users WHERE id = $1', [req.userId]);
    console.log(`Tarefa atualizada: ${title} - Concluída: ${completed} - Usuário: ${user.rows[0].name}`);
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    const user = await pool.query('SELECT name FROM users WHERE id = $1', [req.userId]);
    console.log(`Tarefa deletada: ${result.rows[0].title} - Usuário: ${user.rows[0].name}`);
    return res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };