const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with /api/hashtags
router.route("/")
  .post(

    ( req, res ) => {

      res.json( 'test' );

    }

  )

  
module.exports = router;
