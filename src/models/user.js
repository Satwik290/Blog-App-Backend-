const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{ 
      type:String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true
    },
    password:{
     type:String,
     required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not valid`
        }
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: { type: String, default: "about not provided" },
    skills: { type: [String] },
},{
    timestamps:true,
}
);

const user =mongoose.model("user",userSchema);
module.exports=user;