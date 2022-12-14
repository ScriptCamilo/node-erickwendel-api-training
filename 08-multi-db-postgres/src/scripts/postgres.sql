CREATE TABLE
    TB_HEROES (
        ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
        NAME TEXT NOT NULL,
        POWER TEXT NOT NULL
    );

--create

INSERT INTO
    TB_HEROES (NAME, POWER)
VALUES ('Flash', 'Speed'), (
        'Aquaman',
        'Talk with animals'
    ), ('Batman', 'Money');

--read

SELECT * FROM TB_HEROES LIMIT 100;

SELECT * FROM TB_HEROES WHERE NAME = 'Flash';

--update

UPDATE TB_HEROES SET NAME='Goku', POWER='God' WHERE ID = 1;

--delete

DELETE FROM TB_HEROES WHERE ID = 2;
