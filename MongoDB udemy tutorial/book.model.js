var mongoose=require('mongoose');
var schema=mongoose.Schema;

var BookSchema=new Schema({
    title:String,
    title:{
        type:String,
        required:true,
        unique:true,
        default:Date.now
    }
});

module.exports=mongoose.model('Book',BookSchema);
