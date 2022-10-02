#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Anime = require('./models/anime')
var AnimeCreator = require('./models/animeCreator')
var Genre = require('./models/genre')
var Availability = require('./models/availability')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var animeCreators = []
var genres = []
var animes = []
var availabilities = []

function animeCreatorCreate(first_name, last_name, d_birth, d_death, cb) {
  creatordetail = {first_name:first_name , last_name: last_name }
  if (d_birth != false) creatordetail.date_of_birth = d_birth
  if (d_death != false) creatordetail.date_of_death = d_death
  
  var animeCreator = new AnimeCreator(creatordetail);
       
  animeCreator.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New animeCreator: ' + animeCreator);
    animeCreators.push(animeCreator)
    cb(null, animeCreator)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function animeCreate(title, creator, summary, genre, cb) {
    animedetail = { 
    title: title,
    creator: creator,
    summary: summary,
    genre: genre
  }
  if (genre != false) animedetail.genre = genre
    
  var anime = new Anime(animedetail);    
  anime.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Anime: ' + anime);
    animes.push(anime)
    cb(null, anime)
  }  );
}


function availabilityCreate(anime, studio, status, cb) {
    availabilitydetail = { 
        anime: anime,
        studio: studio
  }    
  if (status != false) availabilitydetail.status = status
    
  var availability = new Availability(availabilitydetail);    
  availability.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Availability: ' + availability);
      cb(err, null)
      return
    }
    console.log('New Availability: ' + availability);
    availabilities.push(availability)
    cb(null, anime)
  }  );
}


function createGenreCreators(cb) {
    async.series([
        function(callback) {
            animeCreatorCreate('Eiichiro', 'Oda', '1975-01-01', false, callback);
        },
        function(callback) {
            animeCreatorCreate('Hajime', 'Isayama', '1986-08-29', false, callback);
        },
        function(callback) {
            animeCreatorCreate('Kentaro', 'Miura', '1966-07-11', '2021-05-06', callback);
        },
        function(callback) {
          genreCreate("Fantasy", callback);
        },
        function(callback) {
          genreCreate("Action", callback);
        },
        function(callback) {
          genreCreate("Dark Fantasy", callback);
        },
        function(callback) {
          genreCreate("Adventure", callback);
        },
        ],
        // optional callback
        cb);
}


function createAnimes(cb) {
    async.parallel([
        function(callback) {
            animeCreate('One Piece',  animeCreators[0], 'The series focuses on Monkey D. Luffy, a young man made of rubber, who, inspired by his childhood idol, the powerful pirate Red-Haired Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates. In an effort to organize his own crew, the Straw Hat Pirates', [genres[0],], callback);
        },
        function(callback) {
            animeCreate("Attack on Titan",  animeCreators[1], "Eren Yeager is a boy who lives in the town of Shiganshina, located on the outermost of three circular walls protecting their inhabitants from Titans. In the year 845, the first wall is breached by two new types of Titans, the Colossal Titan and the Armored Titan. During the incident, Eren's mother is eaten by a Smiling Titan while Eren escapes. He swears revenge on all Titans and enlists in the military along with his adopted sister Mikasa Ackerman and his best friend Armin Arlert.",  [genres[0],], callback);
        },
        function(callback) {
            animeCreate("Berserk",animeCreators[2], "Guts is a lone warrior who was born from a hanged corpse and raised as a mercenary by his abusive adoptive father Gambino. As a child, Guts is trained by Gambino with adult-sized broadswords, causing him to develop a preference for oversized two-handed swords. One night, Gambino stumbles into Guts' tent armed and drunk, forcing Guts to kill him in self-defense. Guts flees his mercenary group and becomes a wandering sellsword. ", [genres[0],], callback);
        },
        ],
        // optional callback
        cb);
}


function createAvailability(cb) {
    async.parallel([
        function(callback) {
          availabilityCreate(animes[0], 'Toei Animation', 'Curently airing', callback)
        },
        function(callback) {
          availabilityCreate(animes[1], 'wit studio ,mappa studio ', 'yet to be aired', callback)
        },
        function(callback) {
          availabilityCreate(animes[2], ' OLM, Inc.','finished airing', callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createGenreCreators,
    createAnimes,
    createAvailability
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('availabilities: '+availabilities);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
