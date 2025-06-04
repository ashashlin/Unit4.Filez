import express from "express";
import { getFiles } from "#db/queries/files";

const filesRouter = express.Router();

filesRouter.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.status(200).send(files);
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
