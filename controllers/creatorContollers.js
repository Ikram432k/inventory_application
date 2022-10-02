const AnimeCreator = require("../models/animeCreator");
const async = require("async");
const Anime = require("../models/anime");

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

// //display details of a specific animecreator
// exports.animeCreator_detail =(req,res)=>{
//     res.send(`NOT IMPEMENTENED: creator details :${req.params.id}`);
// };
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