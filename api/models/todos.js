const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("Todo",todoSchema);
