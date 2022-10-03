const Availability = require("../models/availability");
const Anime = require("../models/anime");
const { body, validationResult } = require("express-validator");

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
        title: "Create Availability",
        anime_list: animes,
      });
    });
  };
  

//handle availability create on POST
exports.availability_create_post = [
  // Validate and sanitize fields.
  body("anime", "Anime must be specified").trim().isLength({ min: 1 }).escape(),
  body("studio", "studio must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a availability object with escaped and trimmed data.
    const availability = new Availability({
      anime: req.body.anime,
      studio: req.body.studio,
      status: req.body.status,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Anime.find({}, "title").exec(function (err, animes) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("availability_form", {
          title: "Create Availability",
          anime_list: animes,
          selected_book: availability.anime._id,
          errors: errors.array(),
          availability,
        });
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
exports.availability_delete_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability delete GET");
};

//handle availability delete on POST
exports.availability_delete_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability delete POST");
};

//display availability update on GET 
exports.availability_update_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability update GET");
};

//handle availability update on POST
exports.availability_update_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability update POST");
};