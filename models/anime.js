const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Animeschema = new Schema({
    title:{type: String, require: true, maxLength: 100},
    creator: {type: Schema.Types.ObjectId, ref: "AnimeCreator", required: true },
    summary:{type: String, require: true, maxLength: 800},
    genre:[{type: Schema.Types.ObjectId, ref: "Genre"}],
});

//virtual for anime url

Animeschema.virtual("url").get(function(){
    return `/catalog/Anime/${this._id}`;
});

//export model
module.exports = mongoose.model("Anime",Animeschema);