const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");


//middleware
app.use(cors());
app.use(express.json()); //req.body



//ROUTES//


//create a todo

app.get("/health", async (req, res) => {
  console.log("called health check");
  res.status(200);
  res.send('All good!');
});

app.post("/todos", async (req, res) => {
  console.log("called API /todos insert");
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    console.log(newTodo);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async(req, res) => {
  console.log("called API /todos select");
  try {
    console.log("trying db connnection");
    const allTodos = await pool.query("SELECT * FROM todo;");
    console.log("result",allTodos);
    res.json(allTodos.rows);

  } catch (err) {
    console.error(err.message);
  }

  // const queryString = "SELECT * FROM todo;";

  //       console.log(queryString);
  //       pool.query(queryString, (err, result) => {
  //           if (err) {
  //               throw err;
  //           }
  //           console.log(result);
  //       });
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  console.log("called API /todos select :ids");
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);
    console.log(todo);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  console.log("called API /todos update");
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    console.log(updateTodo);
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  console.log("called API /todos delete");
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    console.log(deleteTodo);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
