const Genre = require("../models/genre");

//display list of all genre
exports.genre_list =(req,res)=>{
    res.send("NOT IMPEMENTENED: genre list");
};

//display details of a specific genre
exports.genre_detail =(req,res)=>{
    res.send(`NOT IMPEMENTENED: genre details :${req.params.id}`);
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