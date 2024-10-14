CREATE TABLE login (
  id serial PRIMARY KEY, 
  username VARCHAR(50) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budget (
  id serial PRIMARY KEY, 
  user_id integer NOT NULL REFERENCES login(id) ON DELETE CASCADE,
  amount integer NOT NULL 
);



