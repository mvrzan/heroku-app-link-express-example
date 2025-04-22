import JokeAPI from "sv443-joke-api";
import { getCurrentTimestamp } from "../../utils/loggingUtil.js";

const getJoke = async (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - getJoke - Request received...`);

    const response = await JokeAPI.getJokes();

    console.log(response);
    const data = await response.json();

    const joke = `${data.setup} --- ${data.delivery}`;

    if (!response.ok) {
      throw new Error(`There was an error when trying to get a joke: ${response.status} - ${response.statusText}`);
    }

    console.log(`${getCurrentTimestamp()} ✅ - getJoke - A joke was successfully provided!`);

    res.status(200).send({
      message: "A funny joke!",
      joke: joke,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getJoke - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default getJoke;
