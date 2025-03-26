const getSegments = async (req, res) => {
  const { event, context, logger } = req.sdk;

  try {
    const accessToken = context?.org?.accessToken;
    logger.info("accessToken", accessToken);

    res.status(200).json({ message: "Route getSegments invocation was successful!", accessToken });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export default getSegments;
