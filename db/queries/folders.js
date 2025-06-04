import db from "#db/client";

export async function createFolder({ name }) {
  const sql = `
    INSERT INTO folders(
      name
    )
    VALUES(
      $1
    )
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [name]);

  return rows[0];
}

export async function getFolders() {
  const sql = `
    SELECT * FROM folders
  `;
  const { rows } = await db.query(sql);

  return rows;
}

// json_agg(files) is a function that takes all the rows from the files table that match the condition, and turn them into a JSON array
export async function getFolderById(id) {
  const sql = `
    SELECT folders.*,
    (
      SELECT json_agg(files)
      FROM files
      WHERE files.folder_id = folders.id
    ) AS files
    FROM folders
    WHERE folders.id = $1;
  `;
  const { rows } = await db.query(sql, [id]);

  return rows[0];
}
