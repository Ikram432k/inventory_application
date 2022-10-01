const Availability = require("../models/availability");

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
exports.availability_detail =(req,res)=>{
    res.send(`NOT IMPEMENTENED: availability details :${req.params.id}`);
};

//display availability create form on GET
exports.availability_create_get =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability create GET");
};

//handle availability create on POST
exports.availability_create_post =(req,res)=>{
    res.send("NOT IMPEMENTENED: availability create POST");
};

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