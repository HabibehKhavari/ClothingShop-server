CREATE DATABASE clothingshop;
 CREATE TABLE manufacturers ( id SERIAL PRIMARY KEY, name VARCHAR, country VARCHAR, link1 VARCHAR, link2 VARCHAR, description VARCHAR, more_details VARCHAR);


INSERT INTO manufacturers (name, country, link1, link2, description, more_details) VALUES 
('Ade',
    'GRC',
    'www.sample1Ad.com',
    'www.sample2Ad.com',
    'She is 29 and she lives in Greece.',
    'she has worked in Amazon for 3 years.'),
('Denis',
    'GRC',
    'www.sample1De.com',
    'www.sample2De.com',
    'He is 40 and He lives in Greece.',
    'He has worked in Odyssea for 3 years.'),
('Abanoub',
    'EGY',
    'www.sample1AB.com',
    'www.sample2AB.com',
    'He is 30 and he lives in Greece.',
    'He has worked in ZARA for 4 years.'),
('Habibeh',
    'AFG',
    'www.sample1Hb.com',
    'www.sample2HB.com',
    'She is 25 and she lives in Greece.',
    'she has worked in H&M for 2 years.');

 SELECT * FROM manufacturers;