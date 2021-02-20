CREATE DATABASE clothingshop;

--------------manufacturers----------------
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


----------------clothes---------------
CREATE TABLE clothes ( id SERIAL PRIMARY KEY, name VARCHAR, image VARCHAR, manufacturer VARCHAR, description VARCHAR, more_details VARCHAR, promotion BOOLEAN, manufacturers_id integer REFERENCES manufacturers (id));

INSERT INTO clothes (name, image, manufacturer, description, more_details, promotion, manufacturers_id) VALUES 
('shoes',
    'img/shoes.png',
    'Ade',
    'Price:$55 | Size:39 | Color:white',
    'Material:cotton & leather | Brand:Nike |
            Made in Germany.',
    'TRUE',
    '1'),
('shoes',
    'img/shoes.png',
    'Habibeh',
    'Price:$55 | Size:39 | Color:white',
    'Material:cotton & leather | Brand:Nike |
            Made in Germany.',
    'TRUE',
    '4'),
    ('bag',
    'img/bag.png',
    'Denis',
    'Price:$49 | Size:large | Color:black',
    'Material:cotton | Brand:TRIPP | Made in China.',
    'TRUE',
    '2'),
    ('dress',
    'img/dress.png',
    'Abanoub',
    'Price:$28 | Size:38 | Color:dark blue',
    'Material:cotton | Brand:H&M | Made in Greece.',
    'TRUE',
    '3');