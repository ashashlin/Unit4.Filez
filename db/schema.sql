DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders(
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- UNIQUE(name, folder_id): the name and folder_id combination is unique — so no two files with the same name can exist in the same folder
CREATE TABLE files(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  size INT NOT NULL,
  folder_id INT NOT NULL
    REFERENCES folders(id) ON DELETE CASCADE,
  UNIQUE(name, folder_id)
);
