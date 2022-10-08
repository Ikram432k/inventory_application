const Availability = require("../models/availability");
const Anime = require("../models/anime");
const { body, validationResult } = require("express-validator");

const async = require("async");
//display list of all availability
exports.availability_list =(req,res,next)=>{
    Availability.find()
    .populate("anime")
    .exec(function(err,list_availability){
        if(err){
            return next(err);
        }
        res.render("availability_list",{title:"Availability List",availability_list:list_availability});
    });
};

//display details of a specific availability
exports.availability_detail =(req,res,next)=>{
    Availability.findById(req.params.id)
    .populate("anime")
    .exec((err,availability)=>{
        if(err){
            return next(err);
        }
        if(availability == null){
            const err = new Error("Availability not found");
            err.status = 400;
            return next(err);
        }
        res.render("availability_detail",{
            title:`${availability.anime.title}`,
            availability,
        });
    });
};

//display availability create form on GET
exports.availability_create_get =(req, res, next) => {
    Anime.find({}, "title").exec((err, animes) => {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render("availability_form", {
        title: "Create Telecast Details",
        anime_list: animes,
      });
    });
  };
  

//handle availability create on POST
exports.availability_create_post = [


    // Validate and sanitize fields.
    body('anime', 'Name of anime must be specified').trim().isLength({ min: 1 }).escape(),
    body('studio', 'studio name must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {
  
        // Extract the validation errors from a request.
        const errors = validationResult(req);
  
        // Create a BookInstance object with escaped/trimmed data and current id.
        var availability = new Availability(
          { anime: req.body.anime,
            studio: req.body.studio,
            status: req.body.status,
           });
  
        if (!errors.isEmpty()) {
            // There are errors so render the form again, passing sanitized values and errors.
            Anime.find({},'title')
                .exec(function (err, animes) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('availability_form', { 
                    title: 'Create Telecast Details', 
                    anime_list : animes, 
                    selected_anime : availability.anime._id , 
                    errors: errors.array(),
                    availability:availability });
            });
            return;
        }

    // Data from form is valid.
    availability.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new record.
      res.redirect(availability.url);
    });
  },
];


//display availability delete form on GET
exports.availability_delete_get =(req,res,next)=>{
  async.parallel(
    {
    animeAvailability(callback){
      Availability.findById(req.params.id).exec(callback);
    }
    },(err,results)=>{
      if(err){
        return next(err);
      }
      if(results==null){
        res.render("/catalog/availabilities");
      }
      res.render("availability_delete",{
        title:"Delete Availability",
        availability:results.animeAvailability,
      });
    }
  );
};

//handle availability delete on POST
exports.availability_delete_post =(req,res,next)=>{
  async.parallel({
    animeAvailability(callback){
      Availability.findById(req.body.availabilityid).exec(callback);
    }},(err,results)=>{
      if(err){
        return next(err);
      }
      Availability.findByIdAndRemove(req.body.availabilityid,(err)=>{
        if(err){
          return next(err);
        }
        res.redirect("/catalog/availabilities");
      })
    }
  );
};

//display availability update on GET 
exports.availability_update_get =function (req, res, next) {
  // Get book, authors and genres for form.
  async.parallel(
    {
      availability: function (callback) {
        Availability.findById(req.params.id).populate("anime").exec(callback);
      },
      animes: function (callback) {
        Anime.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.availability == null) {
        // No results.
        var err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("availability_form", {
        title: "Update Telecast Detail",
        anime_list: results.animes,
        selected_anime: results.availability.anime._id,
        availability: results.availability,
      });
    }
  );
};


//handle availability update on POST
exports.availability_update_post =[

  // Validate and sanitize fields.
  body('anime', 'Name of anime must be specified').trim().isLength({ min: 1 }).escape(),
  body('studio', 'studio name must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  
  
  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a BookInstance object with escaped/trimmed data and current id.
      var availability = new Availability(
        { anime: req.body.anime,
          studio: req.body.studio,
          status: req.body.status,
          _id: req.params.id
         });

      if (!errors.isEmpty()) {
          // There are errors so render the form again, passing sanitized values and errors.
          Anime.find({},'title')
              .exec(function (err, animes) {
                  if (err) { return next(err); }
                  // Successful, so render.
                  res.render('availability_form', { 
                  title: 'Update Telecast Detail', 
                  anime_list : animes, 
                  selected_anime : availability.anime._id , 
                  errors: errors.array(),
                  availability:availability });
          });
          return;
      }
      else {
          // Data from form is valid.
          Availability.findByIdAndUpdate(req.params.id, availability, {}, function (err,theavailability) {
              if (err) { return next(err); }
                 // Successful - redirect to detail page.
                 res.redirect(theavailability.url);
              });
      }
  }
];
