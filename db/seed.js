import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderNames = [];

  for (let i = 0; i < 3; i++) {
    let name = faker.commerce.department();
    while (folderNames.includes(name)) {
      name = faker.commerce.department();
    }
    folderNames.push(name);

    const folder = await createFolder({ name });
    const folderId = folder.id;

    // reset fileNames for a new folder - we can't have duplicate file names within a folder, but we can have them across folders
    const fileNames = [];

    for (let j = 0; j < 5; j++) {
      let name = faker.system.commonFileName();
      while (fileNames.includes(name)) {
        name = faker.system.commonFileName();
      }
      fileNames.push(name);

      const file = {
        name,
        size: faker.number.int({ min: 100, max: 1000000000 }),
        folder_id: folderId,
      };

      await createFile(file);
    }
  }
}
