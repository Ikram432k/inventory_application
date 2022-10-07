const AnimeCreator = require("../models/animeCreator");
const async = require("async");
const Anime = require("../models/anime");
const { body, validationResult } = require("express-validator");

//display list of all animecreators
exports.animeCreator_list =(req,res)=>{
    AnimeCreator.find()
    .sort([["first_name", "ascending"]])
    .exec(function (err, list_animeCreator) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("creator_list", {
        title: "Creator List",
        animeCreator_list: list_animeCreator,
      });
    });
};

//display details of a specific animecreator
exports.animeCreator_detail =(req,res,next)=>{
    async.parallel(
        {
        creator(callback){
            AnimeCreator.findById(req.params.id).exec(callback);
        },
        creators_anime(callback){
            Anime.find({creator:req.params.id},"title summary").exec(callback);

        },
        },
        (err,results)=>{
            if(err){
                return next(err);
            }
            if(results.creator == null){
                const err = new Error("Creator not fount");
                err.status = 400;
                return next(err);
            }
            res.render("creator_detail",{
            title:"Creator Detail",
            creator:results.creator,
            creators_anime:results.creators_anime,
        })
        }
    )
};
//display animecreator create form on GET
exports.animeCreator_create_get =(req,res,next)=>{
    res.render("creator_form",{title:"Create AnimeCreator"});
};

//handle animecreator create on POST
exports.animeCreator_create_post =[
    // Validate and sanitize fields.
    body("first_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),
    body("last_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Last name must be specified.")
      .isAlphanumeric()
      .withMessage("Last name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    body("date_of_death", "Invalid date of death")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("creator_form", {
          title: "Create Creator",
          creator: req.body,
          errors: errors.array(),
        });
        return;
      }
      // Data from form is valid.
  
      // Create an creator object with escaped and trimmed data.
      const creator = new AnimeCreator({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      creator.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new author record.
        res.redirect(creator.url);
      });
    },
  ];
  

//display animecreator delete form on GET
exports.animeCreator_delete_get =(req, res, next) => {
  async.parallel(
    {
      animeCreator(callback) {
        AnimeCreator.findById(req.params.id).exec(callback);
      },
      creators_anime(callback) {
        Anime.find({ creator: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.animeCreator == null) {
        // No results.
        res.redirect("/catalog/animecreaters");
      }
      // Successful, so render.
      res.render("animeCreator_delete", {
        title: "Delete AnimeCreator",
        animeCreator: results.animeCreator,
        creators_anime: results.creators_anime,
      });
    }
  );
}

//handle animecreator delete on POST
exports.animeCreator_delete_post = (req, res, next) => {
  async.parallel(
    {
      animeCreator(callback) {
        AnimeCreator.findById(req.body.animeCreatorid).exec(callback);
      },
      creators_anime(callback) {
        Anime.find({ creator: req.body.animeCreatorid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.creators_anime.length > 0) {
        // animeCreator has anime. Render in same way as for GET route.
        res.render("animeCreator_delete", {
          title: "Delete AnimeCreator",
          animeCreator: results.animeCreator,
          creators_anime: results.creators_anime,
        });
        return;
      }
      // AnimeCreator has no anime. Delete object and redirect to the list of AnimeCreators.
      AnimeCreator.findByIdAndRemove(req.body.animeCreatorid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to animeCreator list
        res.redirect("/catalog/animecreaters");
      });
    }
  );
};


//display animecreator update on GET 
exports.animeCreator_update_get =function (req, res, next) {

  AnimeCreator.findById(req.params.id, function (err, creator) {
      if (err) { return next(err); }
      if (creator == null) { // No results.
          var err = new Error('Anime Creator not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      //res.send("success")
      res.render('creator_form', { title: 'Update Anime Creator', creator: creator });

  });
};

//handle animecreator update on POST
exports.animeCreator_update_post =[

  // Validate and santize fields.
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
      .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
      .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),


  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create creator object with escaped and trimmed data (and the old id!)
      var creator = new AnimeCreator(
          {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              date_of_birth: req.body.date_of_birth,
              date_of_death: req.body.date_of_death,
              _id: req.params.id
          }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('creator_form', { title: 'Update Anime creator', creator: creator, errors: errors.array() });
          return;
      }
      else {
          // Data from form is valid. Update the record.
          AnimeCreator.findByIdAndUpdate(req.params.id, creator, {}, function (err, thecreator) {
              if (err) { return next(err); }
              // Successful - redirect to Anime creator detail page.
              res.redirect(thecreator.url);
          });
      }
  }
];