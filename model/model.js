const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    name:{
        type: String
    },
    year:{
        type:Number
    },
    books:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});
const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    publishDate:{
        type:String,

    },
    genres:{
        type:[String]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }
});
const taskSchema = new mongoose.Schema({
    name:{
        type:String
    },
    status:{
        type:Boolean
    }
});
let Task = mongoose.model("Task", taskSchema);
let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);
module.exports = {Book, Author, Task};