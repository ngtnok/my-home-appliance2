TRUNCATE TABLE family_to_appliance, appliance;
INSERT INTO appliance (id,name,maker_id,category_id,model_number) VALUES
    (1,'キーボード',9,2,'K855'),
    (2,'スマホ',11,2,'CPH2523'),
    (3,'ホットクック',1,1,'KN-HW24F-R');
INSERT INTO family_to_appliance (family_id, appliance_id, use_place_id, buy_date, buy_at)
    VALUES
    (1,1,7,1515628800000,'楽天市場'),
    (1,3,1,1613952000000,'エディオン'),
    (2,1,1,1714435200000,'ケーズ');