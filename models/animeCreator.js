const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AnimeCreatorSchema = new schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100},
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});
//virtual for animeCreator full name
AnimeCreatorSchema.virtual("name").get(function(){
    return this.first_name+" "+this.last_name;
});

AnimeCreatorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  })
AnimeCreatorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  });


//virtual for animeCreator url
AnimeCreatorSchema.virtual("url").get(function(){
    return `/catalog/animeCreator/${this._id}`;
});



//virtual for 

//export model
module.exports = mongoose.model("AnimeCreator",AnimeCreatorSchema);