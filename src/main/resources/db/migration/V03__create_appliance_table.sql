CREATE TABLE appliance (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    maker_id INT,
    category_id INT,
    model_number VARCHAR,
    url VARCHAR,
    CONSTRAINT fk_maker
        FOREIGN KEY(maker_id)
        REFERENCES maker(id),
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES category(id)
);