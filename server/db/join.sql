-- Grabbing all the posts by a user.

SELECT u.username, p.content
FROM users u 
JOIN posts p ON u.user_id = p.author_id