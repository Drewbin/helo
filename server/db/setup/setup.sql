CREATE TABLE posts (
post_id SERIAL PRIMARY KEY,
content TEXT, 
date DATE

)

CREATE TABLE users (
user_id SERIAL PRIMARY KEY, 
email TEXT,
password VARCHAR
)