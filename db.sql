CREATE SCHEMA users;

CREATE TABLE users.users
(
    id SERIAL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL,
    'isDeleted' boolean DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE users.users
OWNER to postgres;

INSERT INTO users.users(
	login, password, age)
	VALUES ('Anna', 'xxx123', 23);

INSERT INTO users.users(
	login, password, age)
	VALUES ('AnnaAnna', 'xxx123xxx123', 46);
