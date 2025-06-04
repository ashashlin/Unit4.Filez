import { getFolders } from "#db/queries/folders";

export default async function validateFolderId(req, res, next) {
  try {
    const id = Number(req.params.id);

    const folders = await getFolders();
    const matchingFolder = folders.find((folder) => folder.id === id);

    if (!matchingFolder) {
      return res.status(404).send(`Folder with id ${id} does not exist.`);
    }

    next();
  } catch (error) {
    next(error);
  }
}
