CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    family_id INT NOT NULL,
    app_id INT NOT NULL,
    buy_date NUMERIC,
    post_date NUMERIC,
    comment VARCHAR NOT NULL,
    CONSTRAINT fk_app_id
        FOREIGN KEY(app_id)
        REFERENCES appliance(id),
)