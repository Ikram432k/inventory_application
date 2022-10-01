const Anime = require("../models/anime");
const AnimeCreator = require("../models/animeCreator");
const Genre = require("../models/genre");
const Availabilty = require("../models/availability");

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
exports.anime_detail =(req,res)=>{
    res.send(`NOT IMPEMENTENED: anime details :${req.params.id}`);
};

//display anime create form on GET
exports.anime_create_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime create GET");
};

//handle anime create on POST
exports.anime_create_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: anime create POST");
};

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