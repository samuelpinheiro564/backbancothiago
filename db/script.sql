CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY ,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50)NOT NULL
);

INSERT INTO usuarios(nome,email) VALUES ('Samuel','pinheirosamuel206@gmail.com');