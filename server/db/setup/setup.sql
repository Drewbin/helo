CREATE TABLE posts (
post_id SERIAL PRIMARY KEY,
title TEXT,
image TEXT,
content TEXT, 
author_id INT REFERENCES users(user_id)
)

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username TEXT,
password VARCHAR,
pic TEXT
)