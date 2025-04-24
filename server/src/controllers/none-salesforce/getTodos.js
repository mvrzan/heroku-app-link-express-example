import { getCurrentTimestamp } from "../../utils/loggingUtil.js";

const getTodos = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - getTodos - Request received...`);

    const userId = req.query?.userId ?? 1;

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to get todo information: ${response.status} - ${response.statusText}`
      );
    }

    console.log(`${getCurrentTimestamp()} ✅ - getTodos - Todos were successfully provided!`);

    res.status(200).send({
      message: "Todo items",
      todos: data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getTodos - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default getTodos;
