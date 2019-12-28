DROP TABLE IF EXISTS location;

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7)
);

DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    time VARCHAR(255),
    forecast VARCHAR(255)
);

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255),
    name VARCHAR(255),
    event_date VARCHAR(255),
    summary VARCHAR(255)
);

DROP TABLE IF EXISTS moves;

CREATE TABLE moves (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  overview VARCHAR(255),
  average_votes VARCHAR(255),
  total_votes VARCHAR(255),
  image_url VARCHAR(255),
  popularity VARCHAR(255),
  released_on VARCHAR(255)
);

DROP TABLE IF EXISTS yelp;

CREATE TABLE yelp (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image_url VARCHAR(255),
    price VARCHAR(255),
    rating VARCHAR(255),
    url VARCHAR(255)
);


