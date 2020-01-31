const router = require("express").Router();
const userRoutes = require("./users");
const preferenceRoutes = require("./preferences");


// Book routes

router.use("/users", userRoutes);
router.use("/preferences", preferenceRoutes);

module.exports = router;
