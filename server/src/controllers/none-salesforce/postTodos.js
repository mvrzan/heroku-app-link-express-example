import { getCurrentTimestamp } from "../../utils/loggingUtil.js";

const postTodos = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - postTodos - Request received...`);

    const userId = !req.body?.userId ? 1 : req.body.userId;
    const title = !req.body?.title ? "none" : req.body.title;
    const completed = !req.body?.completed === undefined ? "none" : req.body.completed;
    const id = Math.floor(Math.random() * 11) + 10;

    console.log(`${getCurrentTimestamp()} 💽 - postTodos - Todo item details`, {
      title,
      completed,
      userId,
      id,
    });

    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
        completed,
        userId,
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to post todo information: ${response.status} - ${response.statusText}`
      );
    }

    console.log(`${getCurrentTimestamp()} ✅ - postTodos - Todos were successfully published!`);

    res.status(200).send({
      message: "Todo items",
      todos: data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - postTodo - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default postTodos;
