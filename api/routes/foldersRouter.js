import express from "express";
import { getFolderById, getFolders } from "#db/queries/folders";

const foldersRouter = express.Router();

foldersRouter.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.status(200).send(folders);
  } catch (error) {
    next(error);
  }
});

foldersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const folders = await getFolders();
    const matchingFolder = folders.find((folder) => folder.id === id);

    if (!matchingFolder) {
      return res.status(404).send(`Folder with id ${id} does not exist.`);
    }

    const folder = await getFolderById(id);
    res.status(200).send(folder);
  } catch (error) {
    next(error);
  }
});

export default foldersRouter;
