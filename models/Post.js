const mongoose = require("mongoose");
const {Schema} = mongoose
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    comments:[{
      type:Schema.Types.ObjectId,
      ref:'Comment'
    }]

  },
  { timestamps: true }
);



postSchema.pre('findOne', function(next){
    this.populate({ 
      path: 'comments',
      populate: {
        path: 'comments'
      } 
   });
    next()
} )

postSchema.virtual('commentsCount')
           .get(function(){
               return this.comments.length
           })
           
module.exports = mongoose.model("Post", postSchema);
