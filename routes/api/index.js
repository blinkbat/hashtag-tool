const router = require("express").Router();
const hashtagRoutes = require("./hashtags");

// Book routes
router.use("/hashtags", hashtagRoutes);

module.exports = router;
