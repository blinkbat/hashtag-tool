const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with /api/hashtags
router.route("/")
  .post(

    ( req, res ) => {

      const term = req.body.term;

      console.log( term );

      res.json( term );

    }

  )

  
module.exports = router;
