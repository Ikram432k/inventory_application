const AnimeCreator = require("../models/animeCreator");

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
exports.animeCreator_detail =(req,res)=>{
    res.send(`NOT IMPEMENTENED: creator details :${req.params.id}`);
};

//display animecreator create form on GET
exports.animeCreator_create_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator create GET");
};

//handle animecreator create on POST
exports.animeCreator_create_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator create POST");
};

//display animecreator delete form on GET
exports.animeCreator_delete_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator delete GET");
};

//handle animecreator delete on POST
exports.animeCreator_delete_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator delete POST");
};

//display animecreator update on GET 
exports.animeCreator_update_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator update GET");
};

//handle animecreator update on POST
exports.animeCreator_update_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: creator update POST");
};