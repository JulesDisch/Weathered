const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const preferenceRoutes = require("./preferences");


// Book routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/preferences", preferenceRoutes);

module.exports = router;
