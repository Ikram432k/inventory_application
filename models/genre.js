const mongoose = require("mongoose");
const schema = mongoose.Schema;

const GenreSchema = new schema({
    name:{type: String, require:true,minLength:5, maxLength:100}
});

//virtual for genre url

GenreSchema.virtual("url").get(function(){
    return `/catalog/genre/${this._id}`;
})

GenreSchema.virtual("genrename").get(function(){
    return this.name;
})

module.exports = mongoose.model("Genre",GenreSchema);