const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose ;

const userSchema = new Schema({
  username:{
     type:String,
     required: [true, 'Please provide a username'],
  },
  email:{
   type:String,
   required: [true, 'Please provide an email '],
   unique:true,
   match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide a valid email",
   ],
  },
  password:{
    type :String,
    required :[true,'Please provide a password'],
    select:false
  },
  favorites:[{
   type:Schema.Types.ObjectId, 
   ref:'Post'
  }],
  upvotedPosts: [{
   type:Schema.Types.ObjectId, 
   ref:'Post'
  }],
  downvotedPosts:[{type:Schema.Types.ObjectId, ref:'Post'}],

  resetPasswordToken:{
   type:String,
   select:false,
   default:undefined
  },
  resetTokenExpires:{
    type:String,
    select:false,
    default:undefined
  }
})

userSchema.pre('save',async function(next) {
     if(this.isModified('password')){
        const salt = await bcrypt.genSalt(15);
        this.password = await bcrypt.hashSync(this.password, salt);
     }
     next();
})

userSchema.methods.matchPassword = async function(password){
  return  bcrypt.compare(password, this.password)
}

module.exports =  mongoose.model('User', userSchema)