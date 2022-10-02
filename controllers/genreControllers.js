const Genre = require("../models/genre");
const Anime = require("../models/anime");

const async = require("async");
//display list of all genre
exports.genre_list =(req,res)=>{
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
    });
};

//display details of a specific genre
exports.genre_detail =(req,res,next)=>{
    async.parallel({
        genre(callback){
            Genre.findById(req.params.id).exec(callback);
        },
        genre_anime(callback){
            Anime.find({genre:req.params.id}).exec(callback);
        },
    },
    (err,results)=>{
        if(err){
            return next(err);
        }
        if(results.genre == null){
            const err = new Error("Genre not found");
            err.status = 400;
            return next(err);
        }
        res.render("genre_detail",{
            title:"Genre title",
            genre:results.genre,
            genre_anime:results.genre_anime
        });
    }
    );
};


//display genre create form on GET
exports.genre_create_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre create GET");
};

//handle genre create on POST
exports.genre_create_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre create POST");
};

//display genre delete form on GET
exports.genre_delete_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre delete GET");
};

//handle genre delete on POST
exports.genre_delete_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre delete POST");
};

//display genre update on GET 
exports.genre_update_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre update GET");
};

//handle genre update on POST
exports.genre_update_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre update POST");
};