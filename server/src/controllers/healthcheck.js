const healthcheck = (_req, res) => {
  res.status(200).send("OK");
};

export default healthcheck;
