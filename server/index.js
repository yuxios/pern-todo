const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./db')
const pool = require('./db')

// middlewares 
app.use(cors()) //! How does this work? 📑
app.use(express.json()) // req.body

//Routes//

// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", 
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message)
  }
})

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo" );
    res.json(allTodos.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// get a todo
app.get('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    if (todo.rows.length === 0) res.json("NOT FOUND! 😒")
    else res.json(todo.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

// update a todo
app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
    res.json("Todo was updated")
  } catch (error) {
    console.log(error.message)
  }
})

// delete a todo
app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //todo handling edge cases where the id exist or not
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    if(todo.rows.length === 0) res.json("Not Found!") 
    else {
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
      res.json("Todo was deleted")
    }
  } catch (error) {
    console.error(error.message)
  }
})

// 💻 server
app.listen(5000, () => {
  console.log('server has started on port 5000')
})

/**
 * TODO 👨‍🚀🚀
 * ⚡ do this without Express JS and using any middlewares  
 * 
 ** 📝 Notes
 * ⚡ how does one do schema in database with this approach ?
 * 
 ** 📋 Points👇
 * ⚡ 
 */