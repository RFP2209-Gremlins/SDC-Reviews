-- DROP TABLE reviews CASCADE;

-- CREATE TABLE IF NOT EXISTS reviews (
--   id serial NOT NULL PRIMARY KEY,
--   product_id INT NOT NULL,
--   rating INT NOT NULL,
--   date VARCHAR(50) NOT NULL,
--   summary VARCHAR(255) NOT NULL,
--   body VARCHAR(1000) NOT NULL,
--   recommend boolean NOT NULL,
--   reported boolean NOT NULL,
--   reviewer_name VARCHAR(50) NOT NULL,
--   reviewer_email VARCHAR(50) NOT NULL,
--   response VARCHAR(255),
--   helfulness INT
-- );

-- CREATE TABLE IF NOT EXISTS reviews_photos (
--   id serial NOT NULL PRIMARY KEY,
--   review_id INT  NOT NULL,
--   url VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS characteristic_reviews (
--   id serial NOT NULL PRIMARY KEY,
--   characteristic_id INT NOT NULL,
--   review_id INT NOT NULL,
--   value INT NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS characteristics (
--   id serial NOT NULL PRIMARY KEY,
--   product_id INT NOT NULL,
--   name text NOT NULL
-- );



-- \UPDATE reviews SET response = null WHERE response = 'null';
-- \COPY reviews FROM 'data/reviews.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews_photos FROM 'data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristics FROM 'data/characteristics.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristic_reviews FROM 'data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE reviews ALTER COLUMN response SET DEFAULT null;
-- ALTER TABLE reviews ALTER COLUMN helpfulness SET DEFAULT 0;
-- ALTER TABLE reviews ALTER COLUMN reported SET DEFAULT false;


-- ALTER TABLE reviews_photos ADD CONSTRAINT photo_review_key FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id);
-- ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES Reviews (id);

-- SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews)+1);
-- SELECT setval('reviews_photos_id_seq', (SELECT MAX(id) FROM reviews_photos)+1);
-- SELECT setval('characteristic_reviews_id_seq', (SELECT MAX(id) FROM characteristic_reviews)+1);

-- CREATE INDEX review_product_id ON reviews (product_id);
-- CREATE INDEX review_photos_review_id ON reviews_photos (review_id);
-- CREATE INDEX characteristics_product_id ON characteristics (product_id);
-- CREATE INDEX characteristic_review_review_id ON characteristic_reviews (review_id);
-- CREATE INDEX characteristic_review_product_id ON characteristic_reviews (characteristic_id);

-- psql -h localhost -U josephredmond -d reviews -f server/schema.sql - use to run file