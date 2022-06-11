const {Author, Book } = require("../model/model");
const authorController ={
    //add author
    addAuthor: async(req,res) => {
        try{
            const newAuthor = new Author (req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get all author
    getAllAuthors: async(req,res) => {
        try{
            const authors = await Author.find();
            res.status(200).json(authors);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get an author
    getAnAuthor: async(req,res) => {
        try {
            const author = await Author.findById(req.params.id).populate('books');
            res.status(200).json(author);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update an author
    updateAAuthor: async(req,res) => {
        try {
            const author = await Author.findById(req.params.id);
            //console.log(book );
            await author.updateOne({$set: req.body});
            res.status(200).json("Updated successfully");
        } catch (error) {
           res.status(500).json(error);     
        }
    },
    //delete an author
    deleteAnAuthor: async(req,res) => {
        try {
            await Book.updateMany(
                {book: req.params.id},
                {author: null}
            );
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully!");    
        } catch (error) {
             res.status(500).json(error);   
        }
    },
};
module.exports = authorController;