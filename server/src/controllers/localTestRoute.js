const localTestRoute = async (req, res) => {
  console.log("localTestRoute");

  res.status(200).json({ message: "Route localTestRoute invocation was successful!" });
};

export default localTestRoute;
