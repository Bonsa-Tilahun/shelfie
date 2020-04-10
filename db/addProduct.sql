INSERT INTO products 
(name, price, imgurl) 
VALUES 
($1, $2, $3) 
RETURNING *;