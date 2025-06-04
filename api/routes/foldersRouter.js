import express from "express";
import { getFolderById, getFolders } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

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

foldersRouter.post("/:id/files", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const folders = await getFolders();
    const matchingFolder = folders.find((folder) => folder.id === id);

    if (!matchingFolder) {
      return res.status(404).send(`Folder with id ${id} does not exist.`);
    }

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

    const newFile = await createFile({ name, size, folder_id: id });
    res.status(201).send(newFile);
  } catch (error) {
    next(error);
  }
});

export default foldersRouter;
