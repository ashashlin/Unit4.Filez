import db from "#db/client";

export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files(
      name,
      size,
      folder_id
    )
    VALUES(
      $1,
      $2,
      $3
    )
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [name, size, folder_id]);

  return rows[0];
}

export async function getFiles() {
  const sql = `
    SELECT * FROM files
  `;
  const { rows } = await db.query(sql);

  return rows;
}
