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
CREATE TABLE clothes ( id SERIAL PRIMARY KEY, code VARCHAR UNIQUE, image VARCHAR, manufacturer VARCHAR, description VARCHAR, more_details VARCHAR, promotion BOOLEAN, manufacturers_id integer REFERENCES manufacturers (id));

INSERT INTO clothes (code, image, manufacturer, description, more_details, promotion, manufacturers_id) VALUES 
    ('s65432',
    'img/shoes.png',
    'Ade',
    'Price:$55 | Size:39 | Color:white',
    'Material:cotton & leather | Brand:Nike | Made in Germany.',
    'TRUE',
    '1'),
    ('s76543',
    'img/shoes.png',
    'Habibeh',
    'Price:$55 | Size:39 | Color:white',
    'Material:cotton & leather | Brand:Nike | Made in Germany.',
    'TRUE',
    '4'),
    ('b6543',
    'img/bag.png',
    'Denis',
    'Price:$49 | Size:large | Color:black',
    'Material:cotton | Brand:TRIPP | Made in China.',
    'TRUE',
    '2'),
    ('d65432',
    'img/dress.png',
    'Abanoub',
    'Price:$28 | Size:38 | Color:dark blue',
    'Material:cotton | Brand:H&M | Made in Greece.',
    'TRUE',
    '3');


    ------------------------orders---------------------------
    CREATE TABLE orders ( id SERIAL PRIMARY KEY, order_date DATE NOT NULL DEFAULT CURRENT_DATE, quantity integer, customer_code VARCHAR (10), cloth_code VARCHAR REFERENCES clothes (code));

    INSERT INTO orders (quantity, customer_code, cloth_code) VALUES 
    ('5',
    '98765421',
    'd65432'),
    ('2',
    '9876543210',
    'd65432');


------------------------------------------
SELECT column_Name1,column_name2,......
  From tbl_name1,tbl_name2,tbl_name3
  where tbl_name1.column_name = tbl_name2.column_name 
  and tbl_name2.column_name = tbl_name3.column_name
  ----------------------------------------

----------clothes/orderable----------------
SELECT clothes.id, manufacturers.name AS manufacturer_name, manufacturers.country, clothes.code AS cloth_code, clothes.image, clothes.description, clothes.more_details
FROM clothes, manufacturers
where clothes.manufacturers_id = manufacturers.id and clothes.id = $1
