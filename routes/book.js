const bookController = require("../controllers/bookController");

const router = require("express").Router();
//add a book
router.post("/", bookController.addBook);
//get all books
router.get("/", bookController.getAllBooks);
//get a book
router.get("/:id", bookController.getABook);
//update a book
router.put("/:id", bookController.updateABook);
router.delete("/:id", bookController.deleteABook);
module.exports = router;