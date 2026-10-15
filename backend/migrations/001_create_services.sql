CREATE TABLE IF NOT EXISTS services
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
    NULL,
    price
    INTEGER
    NOT
    NULL
    CHECK
(
    price >
    0
)
    );