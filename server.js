'use strict';



// // Express
// // eslint-disable-next-line strict
// require('dotenv').config();
// const express = require('express');
// const superagent = require('superagent');
// const server = express();
// const pg = require('pg');
// const DATABASE_URL = process.env.DATABASE_URL;
// const client = new pg.Client(DATABASE_URL);


// // Cross Origin Resource Sharing
// const cors = require('cors');
// server.use(cors()); // give access

// // get all environment variable you need
// const PORT = process.env.PORT || 3000;
// const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
// const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
// const EVENTFUL_API_KEY = process.env.EVENTFUL_API_KEY;
// const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
// const YELP_API_KEY = process.env.YELP_API_KEY;

// // Make the app listening
// server.listen(PORT, () => console.log('Listening at port 3000'));



// server.get('/', (request, response) => {
//   response.status(200).send('App is working CLAAAAASS');
// });

// /* {
//     "search_query": "lynwood",
//     "formatted_query": "lynood,... ,WA, USA",
//     "latitude": "47.606210",
//     "longitude": "-122.332071"
//   }
// */
// //////////////////////////////////// location /////////////////////////////////

// server.get('/location', locationHandler);

// function Location(city, locationData) {
//   this.formatted_query = locationData[0].display_name;
//   this.latitude = locationData[0].lat;
//   this.longitude = locationData[0].lon;
//   this.search_query = city;
// }

// function locationHandler(request, response) {
//   // Read the city from the user (request) and respond
//   let city = request.query['city'];
//   getLocationData(city)
//     .then((data) => {
//       response.status(200).send(data);
//     });
// }
// // function getLocationData(city) {
// //   const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;

// //   // Superagent
// //   return superagent.get(url)
// //     .then((data) => {
// //       let location = new Location(city, data.body);
// //       return location;
// //     });
// // }
// ///////////////////////// Demo //////////////////////////
// function getLocationData(city) {

//   let sql = `SELECT * FROM information WHERE city = $1`;
//   let values = [city];
//   // console.log('loca data');
//   return client.query(sql, values)
//     .then(results => {
//       if (results.rowCount) {
//         return results.rows[0];
//       } else {
//         const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
//         // console.log('new f1 works');

//         return superagent.get(url)

//           .then(data => checkLocation(city, data.body));
//       }
//     });
// }
// ///////////////////// Demo ///////////////////////////
// function checkLocation(city, data) {
//   // console.log('database location works');
//   // console.log(data);

//   const location = new Location(city ,data[0]);
//   let SQL = `
//     INSERT INTO information (city, latitude, longitude) 
//     VALUES ($1, $2, $3) 
//     RETURNING *
//   `;

//   let values = [city, location.latitude, location.longitude];
//   return client.query(SQL, values)
//     .then(results => results.rows[0]);
// }


// ////////////////////////////////////// weather ///////////////////////
// server.get('/weather', weatherHandler);

// function Weather(day) {
//   this.time = new Date(day.time * 1000).toDateString();
//   this.forecast = day.summary;
// }

// function weatherHandler(request, response) {
//   let lat = request.query['latitude'];
//   //   console.log(lat);
//   let lng = request.query['longitude'];
//   getWeatherData(lat, lng)
//     .then((data) => {
//       response.status(200).send(data);
//     });
// }

// function getWeatherData(lat, lng) {
//   const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}`;
//   return superagent.get(url)
//     .then((weatherData) => {
//       console.log(weatherData.body.daily.data);
//       let weather = weatherData.body.daily.data.map((day) => new Weather(day));
//       return weather;
//     });
// }
// ///////////////////////////// event ////////////////////////////////////////////////
// // [
// //     {
// //       "link": "http://seattle.eventful.com/events/seattle-code-101-explore-software-development-/E0-001-126675997-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
// //       "name": "Seattle Code 101: Explore Software Development",
// //       "event_date": "Sat Dec 7 2019",
// //       "summary": "Thinking about a new career in software development? Start here! In this one-day workshop, you&#39;ll get a taste of a day in the life of a software developer. Code 101 helps you learn what it’s like to be a software developer through a day-long immersive course for beginners that focuses on front-end web development technologies. "
// //     },
// //     {
// //       "link": "http://seattle.eventful.com/events/geekzonehosting-raspberry-pi-jam-session-code-c-/E0-001-121109275-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
// //       "name": "GeekZoneHosting Raspberry Pi Jam Session & Code Carnival 2019",
// //       "event_date": "Sat Dec 7 2019",
// //       "summary": "Join fellow coders, builders, and Raspberry Pi makers in an 8 hour all day event Jam Session builder and code-a-thone to celebrate computer science education week 2019."
// //     },
// //     ...
// //   ]
// server.get('/events', eventHandler);

// function Event(data) {
//   this.link = data.url;
//   this.name = data.title;
//   this.event_date = data.start_time;
//   this.summary = data.discreption;
// }
// function eventHandler(request, response) {
//   //   let link = request.query['link'];
//   let city = request.query.formatted_query;
//   //   console.log(link);
//   getEventData(city)
//     .then((data) => {
//       response.status(200).send(data);
//     });
// }
// function getEventData(formatted_query) {
//   const url = `http://api.eventful.com/json/events/search?app_key=${EVENTFUL_API_KEY}&location=${formatted_query}`;
//   console.log(url);
//   return superagent.get(url)
//     .then((data) => {
//       let toConvertData = JSON.parse(data.text);
//       let event = toConvertData.events.event.map((day) => new Event(day));
//       //   console.log(toConvertData.body.events.event[0].description);
//       return event;
//     });
// }

// // {
// //   "title": "Sleepless in Seattle",
// //   "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
// //   "average_votes": "6.60",
// //   "total_votes": "881",
// //   "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
// //   "popularity": "8.2340",
// //   "released_on": "1993-06-24"
// // },
// /////////////////////////////////////////// movie //////////////////////////////////////////////////

// server.get('/movies' , movieHandler);

// function Movie(data){
//   this.title = data.title;
//   this.overview = data.overview;
//   this.average_votes = data.average_votes;
//   this.total_votes = data.total_votes;
//   // image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg
//   // poster_path: "/bdop0JyS1LXr1d3bDTzy1P5haTB.jpg"
//   this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
//   this.popularity = data.popularity;
//   this.released_on = data.released_on;
// }
// function movieHandler(request, response) {
//   //   let link = request.query['link'];
//   let city = request.query.search_query;
//   //   console.log(link);
//   getMovieData(city)
//     .then((data) => {
//       response.status(200).send(data);
//     });
// }

// // eslint-disable-next-line camelcase
// function getMovieData (search_query){
//   // eslint-disable-next-line camelcase
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${search_query}`;
//   console.log(url);
//   //   return superagent.get(url)
//   //   .then((data) => {
//   //     let toConvertData = JSON.parse(data.text);
//   //     let event = toConvertData.events.event.map((day) => new Event(day));

//   //     return event;
//   // }
//   return superagent.get(url)
//     .then((data) =>{
//       let output = data.body.results.map((element) => new Movie(element));

//       return output;
//     });
// }

// //////////////////////////////////////////// yelp /////////////////////////////////////////////////
// // {
// //   "name": "Pike Place Chowder",
// //   "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg",
// //   "price": "$$   ",
// //   "rating": "4.5",
// //   "url": "https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA"
// // },
// server.get('/yelp' , yelpHandler);

// function Yelp(data){
//   this.name = data.name;
//   // eslint-disable-next-line camelcase
//   this.image_url = data.image_url;
//   this.price = data.price;
//   this.rating = data.rating;
//   this.url = data.url;
// }

// function yelpHandler(request ,response) {
//   let city = request.query.search_query;
//   getYelpData(city)
//     .then((data) => {
//       // eslint-disable-next-line no-undef
//       response.status(200).send(data);
//     });
// }

// function getYelpData (city){
//   // eslint-disable-next-line camelcase
//   const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
//   return superagent.get(url)
//     .set('Authorization', `Bearer ${YELP_API_KEY}`)
//     .then((data) =>{
//       console.log('hiiiiiiiiiii' ,data);
//       const output = data.body.businesses.map( (element) => { return new Yelp(element);
//       });
//       return output;
//     });
// }

// server.use('*', (request, response) => {
//   response.status(404).send('Sorry, not found');
// });

// server.use((error, request, response) => {
//   response.status(500).send(error);
// });
// client.on('error', error => { throw error; })
// client.connect().then( () => {server.listen(PORT, () => console.log('Server up on', PORT));})


/////////////////////////////

'use strict';
// get all environment variable you need
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// initialize a server
const server = express();
server.use(cors()); // give access


const PORT = process.env.PORT ;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const EVENTFUL_API_KEY = process.env.EVENTFUL_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;

// Make the app listening
server.listen(PORT, () => console.log('hello Listening at port 3000'));



server.get('/', (request, response) => {
  response.status(200).send('Lets Rock !!');
});



// first step just like event listener
server.get('/location', locationHandler);

// cons function
function Location(city, data) {
  // console.log('constructor');
  // console.log(data);
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
  this.search_query = city;
}


//where the magic happend...
function locationHandler(request, response) {
  // Read the city from the user (request) and respond
  // console.log('handler');
  let city = request.query['city'];

  getLocationData(city)
    .then((data) => {
      response.status(200).send(data);
    });
}


function getLocationData(city) {

  let sql = `SELECT * FROM information WHERE city = $1`;
  let values = [city];
  // console.log('loca data');
  return client.query(sql, values)
    .then(results => {
      if (results.rowCount) {
        return results.rows[0];
      } else {
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
        console.log(url);
        // console.log('new f1 works');

        return superagent.get(url)

          .then(data => dataBaseLocation(city, data.body));
      }
    });
}


// //////
function dataBaseLocation(city, data) {
  // console.log('database location works');
  // console.log(data);

  const location = new Location(city ,data[0]);
  let SQL = `
    INSERT INTO information (city, latitude, longitude) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;

  let values = [city, location.latitude, location.longitude];
  return client.query(SQL, values)
    .then(results => results.rows[0]);
}



/////////////////////////////


// first step , just to make our code cleaner
server.get('/weather', weatherHandler);

// the costructor function
function Weather(day) {
  this.time = new Date(day.time * 1000).toDateString();
  this.forecast = day.summary;
}

function weatherHandler(request, response) {
  let lat = request.query['latitude'];
  let lng = request.query['longitude'];
  getWeatherData(lat, lng)
    .then((data) => {
      response.status(200).send(data);
    });

}

function getWeatherData(lat, lng) {
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}`;
  return superagent.get(url)
    .then((weatherData) => {
      //   console.log(weatherData.body.daily.data);
      let weather = weatherData.body.daily.data.map((day) => new Weather(day));
      return weather;
    });
}

/////////////////////////// test

server.get('/events', eventHandler);

function Event(day) {
  this.link = day.url;
  this.name = day.title;
  this.eventDate = day.start_time;
  this.summary = day.description;
}

function eventHandler(request, response) {
  let lat = request.query['latitude'];
  let lng = request.query['longitude'];
  getEventData(lat, lng)
    .then((data) => {
      response.status(200).send(data);
    });

}

function getEventData(lat, lng) {
  const url = `http://api.eventful.com/json/events/search?app_key=${EVENTFUL_API_KEY}&where=${lat},${lng}`;
  // console.log(url);
  return superagent.get(url)
    .then((eventData) => {
      let dataBase = JSON.parse(eventData.text);
      //   console.log(dataBase.events.event[0].description);
      let events = dataBase.events.event.map((day) => {return new Event(day)});
      return events;
    });
}


///////////////////////////
/////////////////////////////////
///////////////// Movies ////////////////
server.get('/movies', movieHandler);

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}


function movieHandler(request, response) {
  // let city = request.query.search_query;
  let city = request.query['city'];
  // console.log(city);
  // let lat = request.query['latitude'];
  // let lng = request.query['longitude'];
  getMoviesData(city)
    .then((data) => {
      response.status(200).send(data);
    });
}

function getMoviesData(city) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
  
  return superagent.get(url)
    .then((movieData) => {
      let mov= movieData.body.results.map( movie => new Movie(movie));
      return mov;
    })
}
///////////////// Movies ////////////////
//////////////////////////////
/////////////////////
///////////////// Yelp ////////////////
//////////////////////////////
/////////////////////

// server.get('/yelp' , yelpHandler) ;

// function yelpHandler (request, response) {
//   let lat = request.query['latitude'] ;
//   let lng = request.query['longitude'] ;

//   getYelpData(lat, lng)
//     .then((data) => {
//       response.status(200).send(data);
//     });
// }


// function getYelpData(lat, lng){
//   const url = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${lat}&longitude=${lng}` ;
//   console.log(url)
//   console.log('get data boooy')
//   return superagent.get(url)
//     .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
//     .then((yelpdata) => {
//       // console.log(yelpdata.body.businesses);

//       let yelps = yelpdata.body.businesses.map((business) => {
//         return new Yelp(business) ;
//       })
//       return yelps ;
//     })
// }


// function Yelp (business) {
//   this.name = business.name ;
//   this.image_url = business.image_url ;
//   this.price = business.price ;
//   this.rating = business.rating ;
//   this.url = business.url ;
// }
server.get('/yelp' , yelpHandler);

function Yelp(data){
  this.name = data.name;
  // eslint-disable-next-line camelcase
  this.image_url = data.image_url;
  this.price = data.price;
  this.rating = data.rating;
  this.url = data.url;
}


///////////////// Yelp ////////////////
//////////////////////////////
/////////////////////

server.get('/yelp' , yelpHandler) ;

function yelpHandler (request, response) {
  let lat = request.query['latitude'] ;
  let lng = request.query['longitude'] ;

  getYelpData(lat, lng)
    .then((data) => {
      response.status(200).send(data);
    });
}


function getYelpData(lat, lng){
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${lat}&longitude=${lng}` ;
  console.log(url)
  console.log('get data boooy')
  return superagent.get(url)
    .set('Authorization', `Bearer ${YELP_API_KEY}`)
    .then((yelpdata) => {
      // console.log(yelpdata.body.businesses);

      let yelps = yelpdata.body.businesses.map((business) => {
        return new Yelp(business) ;
      })
      return yelps ;
    })
}


function Yelp (business) {
  this.name = business.name ;
  this.image_url = business.image_url ;
  this.price = business.price ;
  this.rating = business.rating ;
  this.url = business.url ;
}
///////////////// yelp ////////////////
//////////////////////////////
/////////////////////






server.use('*', (request, response) => {
  response.status(404).send('Sorry, not found');
});

server.use((error, request, response) => {
  response.status(500).send(error);
});

client.on('error', error => { throw error; })
client.connect().then( () => {server.listen(PORT, () => console.log('Server up on', PORT));})