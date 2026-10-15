CREATE TABLE IF NOT EXISTS specialists
(
    id
    INTEGER
    GENERATED
    ALWAYS AS
    IDENTITY
    PRIMARY
    KEY,
    name
    TEXT
    NOT
    NULL
);