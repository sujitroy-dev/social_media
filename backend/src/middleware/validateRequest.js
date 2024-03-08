import { object } from "yup";

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};
