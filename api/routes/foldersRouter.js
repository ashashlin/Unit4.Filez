import express from "express";
import { getFolderById, getFolders } from "#db/queries/folders";
import { createFile } from "#db/queries/files";
import validateFolderId from "#api/middleware/validateFolderId";
import validateReqBody from "#api/middleware/validateReqBody";

const foldersRouter = express.Router();

foldersRouter.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.status(200).send(folders);
  } catch (error) {
    next(error);
  }
});

foldersRouter.get("/:id", validateFolderId, async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const folder = await getFolderById(id);
    res.status(200).send(folder);
  } catch (error) {
    next(error);
  }
});

foldersRouter.post(
  "/:id/files",
  validateFolderId,
  validateReqBody,
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { name, size } = req.body;

      const newFile = await createFile({ name, size, folder_id: id });
      res.status(201).send(newFile);
    } catch (error) {
      next(error);
    }
  }
);

export default foldersRouter;
