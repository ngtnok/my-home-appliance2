CREATE TABLE family_to_appliance (
    family_id INT NOT NULL,
    appliance_id INT NOT NULL,
    use_place_id INT,
    buy_date INT,
    buy_at VARCHAR,
    CONSTRAINT fk_appliance
        FOREIGN KEY(appliance_id)
        REFERENCES appliance(id)
)