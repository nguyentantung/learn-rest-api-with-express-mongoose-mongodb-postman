const res = require("express/lib/response");
const {Author, Book } = require("../model/model");
const bookController ={
    //add book
    addBook: async(req,res) => {
        try{
            const newBook = new Book (req.body);
            const savedBook = await newBook.save();
            if(req.body.author){
                const author = Author.findById(req.body.author);
                await author.updateOne({$push: {books: savedBook._id}});        
            }
            res.status(200).json(savedBook);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get all author
    getAllBooks: async(req,res) => {
        try{
            const books = await Book.find();
            res.status(200).json(books);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get a book
    getABook: async(req,res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update a book
    updateABook: async(req,res) => {
        try {
            const book = await Book.findById(req.params.id);
            //console.log(book );
            const updateBook = await book.updateOne({$set: req.body});
            res.status(200).json(updateBook);
        } catch (error) {
           res.status(500).json(error);     
        }
    },
    //delete a book
    deleteABook: async(req,res) => {
        try {
            await Author.updateMany(
                {book: req.params.id},
                {$pull: {books: req.params.id}}
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully!");    
        } catch (error) {
             res.status(500).json(error);   
        }
    },
};
module.exports = bookController;