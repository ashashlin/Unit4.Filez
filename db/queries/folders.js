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
