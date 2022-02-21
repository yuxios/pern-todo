-- @block
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

-- @block
CREATE TABLE Users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(2)
)

-- @block
INSERT INTO todo 
(description) 
VALUES ('VueJS'), ('SvelteJS'), ('SolidJS'), ('QWIKJS')

-- @block
SELECT description FROM todo WHERE todo_id = 3;


