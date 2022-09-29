const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
    anime:{type: Schema.Types.ObjectId, ref:"Anime", required: true},
    studio:{type: String, required: true, maxLength: 100},
    status:{
        type: String,
        required: true,
        enum:["Curently airing","yet to be aired","finished airing"],
        default:"curently airing",
    },
});

//virtual for availability
AvailabilitySchema.virtual("url").get(function(){
    return `/catalog/Availability/${this._id}`;
}) 

module.exports = mongoose.model("Availability",AvailabilitySchema);