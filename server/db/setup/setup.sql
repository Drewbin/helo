CREATE TABLE posts (
post_id SERIAL PRIMARY KEY,
title TEXT,
post_image TEXT,
content TEXT, 
author_id INT
)

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username TEXT,
password VARCHAR,
user_image  TEXT
)