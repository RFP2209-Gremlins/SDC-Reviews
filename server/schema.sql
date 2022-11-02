CREATE TABLE IF NOT EXISTS reviews (
  id serial NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date timestamp NOT NULL,
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  recommend boolean NOT NULL,
  reported boolean NOT NULL,
  reviewer_name VARCHAR(50) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL,
  response VARCHAR(255),
  helfulness INT
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id serial NOT NULL PRIMARY KEY,
  review_id INT  NOT NULL,
  url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id serial NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
  id serial NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  name text NOT NULL
);