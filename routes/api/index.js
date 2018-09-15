const router = require("express").Router();
const artiRoutes = require("./arti");

// Article routes
router.use("/arti", artiRoutes);

module.exports = router;
