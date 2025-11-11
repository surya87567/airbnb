const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const favourite = require('./favourite');

const homeSchema=mongoose.Schema({
  houseName:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  photoUrl:String,
  description:String,

});

homeSchema.pre('findOneAndDelete',async function(next){
  console.log("came to pre hook while deleting a home");
  const homeId=this.getquery()._id;
  await favourite.deleteMany({houseId:homeId});
  next();
});

module.exports=mongoose.model('Home',homeSchema);
