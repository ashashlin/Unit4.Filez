import { getFolders } from "#db/queries/folders";
import express from "express";

const foldersRouter = express.Router();

foldersRouter.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.status(200).send(folders);
  } catch (error) {
    next(error);
  }
});

export default foldersRouter;
