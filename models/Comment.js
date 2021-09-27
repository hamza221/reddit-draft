
const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
   
   body:{
     type:String,
     required:true,
     maxLength:200
   },
   author:{
     type:Schema.Types.ObjectId 
   },
   comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]

},{timestamps:true})

/* commentSchema.pre('findOne', function(next){
  this.populate('comments');
  next()
} )
commentSchema.pre('find',function(next){
  this.populate('comments');
  next()
} ) */
module.exports = mongoose.model('Comment', commentSchema);