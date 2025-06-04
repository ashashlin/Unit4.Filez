export default function validateReqBody(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send(
          "Error: no request body provided. Please provide a request body with your request."
        );
    }

    const { name, size } = req.body;

    if (!name || !size) {
      return res
        .status(400)
        .send(
          "Error: request body is missing one or more fields. Please provide name, size of a file."
        );
    }

    next();
  } catch (error) {
    next(error);
  }
}
