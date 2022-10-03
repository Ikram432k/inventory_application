const Anime = require("../models/anime");
const AnimeCreator = require("../models/animeCreator");
const Genre = require("../models/genre");
const Availabilty = require("../models/availability");
const { body, validationResult } = require("express-validator");

const async = require("async");


exports.index = (req,res)=>{
    async.parallel(
    {
        anime_count(callback){
            Anime.countDocuments({},callback);
        },
        availability_count(callback){
            Availabilty.countDocuments({},callback);
        },
        availability_finished_count(callback) {
            Availabilty.countDocuments({ status: "finished airing" }, callback);
        },
        animeCreator_count(callback) {
            AnimeCreator.countDocuments({}, callback);
        },
        genre_count(callback) {
            Genre.countDocuments({}, callback);
        },
    },
    (err,result)=>{
        res.render("index",{
            title: "Anime Library",
            err: err,
            data: result, 
        });
    });
};

//display list of all anime
exports.anime_list = function(req,res,next){
    Anime.find({},"title creator")
    .sort({title:1})
    .populate("creator")
    .exec(function(err,list_anime){
        if(err){
            return next(err);
        }
        res.render("anime_list",{title:"Anime List",anime_list:list_anime});
    });
};

//display details of a specific anime
exports.anime_detail =(req,res,next)=>{
    async.parallel(
        {
            anime(callback){
                Anime.findById(req.params.id)
                .populate("creator")
                .populate("genre")
                .exec(callback)
            },
            anime_availability(callback){
                Availabilty.find({anime:req.params.id}).exec(callback);
            },
        },
        (err,results)=>{
            if(err){
                return next(err);
            }
            if(results.anime == null){
                const err = new Error("Anime not found");
                err.status = 400;
                return next(err);
            }
            res.render("anime_detail",{
                title:"Anime deatil",
                anime:results.anime,
                anime_availability:results.anime_availability,
            })
        }
    )
};

//display anime create form on GET
exports.anime_create_get =(req, res, next) => {
    // Get all animeCreator and genres, which we can use for adding to our anime.
    async.parallel(
      {
        animeCreators(callback) {
            AnimeCreator.find(callback);
        },
        genres(callback) {
            Genre.find(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("anime_form", {
          title: "Create anime",
          animeCreators: results.animeCreators,
          genres: results.genres,
        });
      }
    );
  };

//handle anime create on POST
exports.anime_create_post = [ 
    // Convert the genre to an array.
    (req, res, next) => {
      if (!Array.isArray(req.body.genre)) {
        req.body.genre =
          typeof req.body.genre === "undefined" ? [] : [req.body.genre];
      }
      next();
    },
  
    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("creator", "Creator must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("summary", "Summary must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("genre.*").escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a anime object with escaped and trimmed data.
      const anime = new Anime({
        title: req.body.title,
        creator: req.body.creator,
        summary: req.body.summary,
        genre: req.body.genre,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        // Get all animeCreator and genres for form.
        async.parallel(
          {
            animeCreators(callback) {
                AnimeCreator.find(callback);
            },
            genres(callback) {
              Genre.find(callback);
            },
          },
          (err, results) => {
            if (err) {
              return next(err);
            }
  
            // Mark our selected genres as checked.
            for (const genre of results.genres) {
              if (anime.genre.includes(genre._id)) {
                genre.checked = "true";
              }
            }
            res.render("anime_form", {
              title: "Create Anime",
              animeCreators: results.animeCreators,
              genres: results.genres,
              anime,
              errors: errors.array(),
            });
          }
        );
        return;
      }
  
      // Data from form is valid. Save anime.
      anime.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful: redirect to new anime record.
        res.redirect(anime.url);
      });
    },
  ];


//display anime delete form on GET
exports.anime_delete_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime delete GET");
};

//handle anime delete on POST
exports.anime_delete_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime delete POST");
};

//display anime update on GET 
exports.anime_update_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime update GET");
};

//handle anime update on POST
exports.anime_update_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime update POST");
};