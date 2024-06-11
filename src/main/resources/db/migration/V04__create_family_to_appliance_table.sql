CREATE TABLE family_to_appliance (
    family_id INT NOT NULL,
    appliance_id INT NOT NULL,
    use_place_id INT NOT NULL,
    buy_date NUMERIC,
    buy_at VARCHAR,
    CONSTRAINT fk_appliance
        FOREIGN KEY(appliance_id)
        REFERENCES appliance(id),
    CONSTRAINT fk_use_place
        FOREIGN KEY(use_place_id)
        REFERENCES use_place(id)
)